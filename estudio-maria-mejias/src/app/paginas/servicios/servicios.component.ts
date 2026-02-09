import { Component, OnInit } from '@angular/core';
import { ServicioService, Servicio } from '../../services/servicio.service';

@Component({
  selector: 'app-servicios',
  standalone: false,
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {

  servicios: Servicio[] = [];
  servicioSeleccionado?: Servicio;

  constructor(private servicioService: ServicioService) { }

  ngOnInit(): void {
    this.servicioService.getServicios().subscribe(data => {
      this.servicios = data;
      this.agruparPorCategoria();
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
  

  serviciosPorCategoria: { [categoria: string]: Servicio[] } = {};
  categoriasAbiertas: { [categoria: string]: boolean } = {};


  abrirDetalle(servicio: Servicio) {
    this.servicioSeleccionado = servicio;
  }

  cerrarDetalle() {
    this.servicioSeleccionado = undefined;
  }
}