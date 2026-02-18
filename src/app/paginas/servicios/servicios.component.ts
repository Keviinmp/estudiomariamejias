import { Component, OnInit } from '@angular/core';
import { ServicioService, Servicio } from '../../services/servicio.service';

import { MatDialog } from '@angular/material/dialog';
import { ReservaModalComponent } from '../reserva-modal/reserva-modal.component';

@Component({
  selector: 'app-servicios',
  standalone: false,
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  servicios: Servicio[] = [];
  servicioSeleccionado?: Servicio;
  serviciosPorCategoria: { [categoria: string]: Servicio[] } = {};
  categoriasAbiertas: { [categoria: string]: boolean } = {};
  
  cargando: boolean = true;

  constructor(
    private servicioService: ServicioService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.servicioService.getServicios().subscribe({
      next: (data) => {
        this.servicios = data;
        this.agruparPorCategoria();
        this.cargando = false;
      },
      error: (err) => {
        console.error("Error cargando servicios:", err);
        this.cargando = false;
      }
    });
  }
  
  agruparPorCategoria() {
    this.serviciosPorCategoria = {};
    for (const servicio of this.servicios) {
      if (!this.serviciosPorCategoria[servicio.categoria]) {
        this.serviciosPorCategoria[servicio.categoria] = [];
        this.categoriasAbiertas[servicio.categoria] = true;
      }
      this.serviciosPorCategoria[servicio.categoria].push(servicio);
    }
  }

  abrirDetalle(servicio: Servicio) {
    this.servicioSeleccionado = servicio;
  }

  cerrarDetalle() {
    this.servicioSeleccionado = undefined;
  }

  abrirReserva(servicio: Servicio) {
    this.dialog.open(ReservaModalComponent, {
      width: '1000px',
      data: servicio,
      panelClass: 'custom-modalbox'
    });
  }
}