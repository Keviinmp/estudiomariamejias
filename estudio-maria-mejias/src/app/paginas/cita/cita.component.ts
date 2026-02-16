import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cita',
  standalone: false,
  templateUrl: './cita.component.html',
  styleUrl: './cita.component.css'

})
export class CitaComponent implements OnInit {

  fechaActual = new Date();
  diasDelMes: number[] = [];
  diaSeleccionado: number | null = null;

  horasDisponibles: string[] = [];

  ngOnInit() {
    this.generarCalendario();
    this.generarHoras();
  }

  generarCalendario() {
    const año = this.fechaActual.getFullYear();
    const mes = this.fechaActual.getMonth();

    const ultimoDia = new Date(año, mes + 1, 0).getDate();

    this.diasDelMes = Array.from({ length: ultimoDia }, (_, i) => i + 1);
  }

  seleccionarDia(dia: number) {
    this.diaSeleccionado = dia;
  }

  generarHoras() {
    const mañana = this.rangoHoras(10, 14);
    const tarde = this.rangoHoras(15, 19);
    this.horasDisponibles = [...mañana, ...tarde];
  }

  rangoHoras(inicio: number, fin: number): string[] {
    const horas: string[] = [];
    for (let h = inicio; h < fin; h++) {
      horas.push(`${h}:00`);
      horas.push(`${h}:30`);
    }
    return horas;
  }

}