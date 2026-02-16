import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Servicio } from '../../services/servicio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Servicio,
    private dialogRef: MatDialogRef<ReservaModalComponent>,
    private fb: FormBuilder,
    @Inject(Firestore) private firestore: Firestore
  ) {
    this.servicio = data;
    this.duracionEnMinutos = this.parsearDuracion(this.servicio?.duracion || '0min');

    this.reservaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9,12}$')]],
      notas: ['']
    });
  }

  ngOnInit() {
    this.generarCalendario();
    this.diaSeleccionado = this.fechaActual.getDate();
    this.actualizarHoras();
  }

  siguientePaso() {
    if (this.horaSeleccionada) {
      this.paso = 2;
    }
  }

  atras() {
    this.paso = 1;
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
        fechaReserva: new Date(),
        estado: 'pendiente'
      };
  
      const citasRef = collection(this.firestore, 'citas');
  
      // Guardamos el documento
      await addDoc(citasRef, nuevaReserva);
  
      console.log("¡Reserva guardada en Firebase!");
      this.paso = 3;
  
    } catch (error) {
      console.error("Error al guardar en Firebase:", error);
      alert("No se pudo guardar la reserva. Revisa tu conexión.");
    }
  }

  scrollDias(pixeles: number) {
    if (this.calendarioScroll) {
      this.calendarioScroll.nativeElement.scrollBy({
        left: pixeles,
        behavior: 'smooth'
      });
    }
  }

  parsearDuracion(duracionStr: string): number {
    let total = 0;
    const h = duracionStr.match(/(\d+)h/);
    const m = duracionStr.match(/(\d+)min/);
    if (h) total += parseInt(h[1]) * 60;
    if (m) total += parseInt(m[1]);
    return total;
  }

  actualizarHoras() {
    this.horasDisponibles = [];
    const inicio = this.turnoSeleccionado === 'Mañana' ? 10 : 15;
    const fin = this.turnoSeleccionado === 'Mañana' ? 14 : 19;

    for (let h = inicio; h < fin; h++) {
      [0, 30].forEach(m => {
        const inicioMin = h * 60 + m;
        if (inicioMin + this.duracionEnMinutos <= fin * 60) {
          const mStr = m === 0 ? '00' : m;
          this.horasDisponibles.push(`${h}:${mStr}`);
        }
      });
    }
  }

  generarCalendario() {
    const nombres = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const hoy = new Date();
    this.diasVisibles = [];
    for (let i = 0; i < 30; i++) {
      const d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + i);
      this.diasVisibles.push({ 
        numero: d.getDate(), 
        nombre: nombres[d.getDay()],
        fechaCompleta: d 
      });
    }
  }

  seleccionarDia(dia: number) {
    this.diaSeleccionado = dia;
    this.actualizarHoras();
  }

  cambiarTurno(turno: string) {
    this.turnoSeleccionado = turno;
    this.horaSeleccionada = null;
    this.actualizarHoras();
  }

  cerrar() {
    this.dialogRef.close();
  }
}