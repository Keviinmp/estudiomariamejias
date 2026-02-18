import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Servicio } from '../../services/servicio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore, collection, addDoc, query, where, getDocs } from '@angular/fire/firestore';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-reserva-modal',
  standalone: false,
  templateUrl: './reserva-modal.component.html',
  styleUrls: ['./reserva-modal.component.css']
})
export class ReservaModalComponent implements OnInit {
  @ViewChild('calendarioScroll') calendarioScroll!: ElementRef;

  paso: number = 1;
  reservaForm: FormGroup;

  servicio: Servicio;
  duracionEnMinutos: number = 0;
  
  fechaActual = new Date();
  diasVisibles: any[] = [];
  diaSeleccionado!: number;
  
  turnoSeleccionado: string = 'Mañana';
  horasDisponibles: string[] = [];
  horaSeleccionada: string | null = null;

  citasDelDia: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Servicio,
    private dialogRef: MatDialogRef<ReservaModalComponent>,
    private fb: FormBuilder,
    @Inject(Firestore) private firestore: Firestore
  ) {
    this.servicio = data;
    this.duracionEnMinutos = this.parsearDuracion(this.servicio?.duracion || '0min');

    this.reservaForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], 
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]], 
      notas: ['']
    });
  } 

  async ngOnInit() {
    // Inicializar EmailJS con su key
    emailjs.init("Wu72NZaCNMI7xe6eC");

    this.generarCalendario();
    this.diaSeleccionado = this.fechaActual.getDate();
    await this.cargarCitasOcupadas();
  }

  // --- LÓGICA DE FIREBASE Y BLOQUEO ---

  async cargarCitasOcupadas() {
    try {
      const citasRef = collection(this.firestore, 'citas');
      const q = query(citasRef, where('dia', '==', this.diaSeleccionado));
      const querySnapshot = await getDocs(q);
      
      this.citasDelDia = querySnapshot.docs.map(doc => doc.data());
      
      this.actualizarHoras();

      if (this.horasDisponibles.length === 0) {
        const dia = this.diasVisibles.find(d => d.numero === this.diaSeleccionado);
        if (dia) dia.estaLleno = true;
      }
    } catch (error) {
      console.error("Error cargando citas ocupadas:", error);
    }
  }

  actualizarHoras() {
    this.horasDisponibles = [];
    const inicio = this.turnoSeleccionado === 'Mañana' ? 10 : 15;
    const fin = this.turnoSeleccionado === 'Mañana' ? 14 : 19;

    for (let h = inicio; h < fin; h++) {
      [0, 30].forEach(m => {
        const inicioHuecoMin = h * 60 + m;
        const horaTexto = `${h}:${m === 0 ? '00' : m}`;

        const estaOcupado = this.citasDelDia.some(cita => {
          const [citaH, citaM] = cita.hora.split(':').map(Number);
          const inicioCita = citaH * 60 + citaM;
          const finCita = inicioCita + (cita.duracionMinutos || 30);
          const finHuecoMin = inicioHuecoMin + this.duracionEnMinutos;
          
          return (inicioHuecoMin >= inicioCita && inicioHuecoMin < finCita) || 
                 (finHuecoMin > inicioCita && finHuecoMin <= finCita);
        });

        if (!estaOcupado && (inicioHuecoMin + this.duracionEnMinutos <= fin * 60)) {
          this.horasDisponibles.push(horaTexto);
        }
      });
    }
  }

  async proximaFechaDisponible() {
    const proximo = this.diasVisibles.find(d => 
      !d.esFinDeSemana && !d.estaLleno && d.numero > this.diaSeleccionado
    );

    if (proximo) {
      await this.seleccionarDia(proximo.numero);
      const index = this.diasVisibles.indexOf(proximo);
      this.calendarioScroll.nativeElement.scrollTo({
        left: index * 85,
        behavior: 'smooth'
      });
    } else {
      alert("No se han encontrado más huecos disponibles en los próximos días.");
    }
  }

  async confirmarReserva() {
    if (this.reservaForm.invalid) {
      this.reservaForm.markAllAsTouched();
      return;
    }
  
    try {
      const nuevaReserva = {
        ...this.reservaForm.value,
        servicio: this.servicio.nombre,
        dia: this.diaSeleccionado,
        hora: this.horaSeleccionada,
        duracionMinutos: this.duracionEnMinutos,
        fechaReserva: new Date(),
        estado: 'pendiente'
      };
  
      // 1. Guardar en Firebase
      const citasRef = collection(this.firestore, 'citas');
      await addDoc(citasRef, nuevaReserva);

      // 2. Enviar Correo Automático vía EmailJS
      this.enviarConfirmacionEmail(nuevaReserva);

      // 3. Pasar al paso de éxito
      this.paso = 3;
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  }

  private enviarConfirmacionEmail(datosCita: any) {
    const templateParams = {
      to_name: datosCita.nombre,
      to_email: datosCita.email,
      servicio: datosCita.servicio,
      fecha: datosCita.dia,
      hora: datosCita.hora,
      notas: datosCita.notas || 'Ninguna'
    };

    emailjs.send(
      'service_yj6q2nq',
      'template_tb1acuu',
      templateParams
    )
    .then((result) => {
      console.log('Correo enviado correctamente!', result.text);
    }, (error) => {
      console.error('Error al enviar el correo:', error.text);
    });
  }

  // --- NAVEGACIÓN Y CALENDARIO ---

  async seleccionarDia(dia: number) {
    this.diaSeleccionado = dia;
    this.horaSeleccionada = null;
    await this.cargarCitasOcupadas();
  }

  cambiarTurno(turno: string) {
    this.turnoSeleccionado = turno;
    this.horaSeleccionada = null;
    this.actualizarHoras();
  }

  siguientePaso() { if (this.horaSeleccionada) this.paso = 2; }
  atras() { this.paso = 1; }

  scrollDias(pixeles: number) {
    if (this.calendarioScroll) {
      this.calendarioScroll.nativeElement.scrollBy({ left: pixeles, behavior: 'smooth' });
    }
  }

  parsearDuracion(duracionStr: string): number {
    let total = 0;
    const h = duracionStr.match(/(\d+)h/);
    const m = duracionStr.match(/(\d+)min/);
    if (h) total += parseInt(h[1]) * 60;
    if (m) total += parseInt(m[1]);
    return total || 30;
  }

  generarCalendario() {
    const nombres = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const hoy = new Date();
    this.diasVisibles = [];
  
    for (let i = 0; i < 30; i++) {
      const d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + i);
      const dayOfWeek = d.getDay();
      
      this.diasVisibles.push({ 
        numero: d.getDate(), 
        nombre: nombres[dayOfWeek],
        fechaCompleta: d,
        esFinDeSemana: (dayOfWeek === 0 || dayOfWeek === 6),
        estaLleno: false 
      });
    }
  }

  cerrar() { this.dialogRef.close(); }
}