import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent implements OnInit, OnDestroy {
  imagenes = [
    'assets/imagenes/carrusel2.jpeg',
    'assets/imagenes/carrusel3.jpeg',
    'assets/imagenes/carrusel4.jpeg',
    'assets/imagenes/carrusel5.jpeg',
    'assets/imagenes/carrusel6.jpeg',
    'assets/imagenes/carrusel7.jpeg',
    'assets/imagenes/carrusel8.jpeg',
    'assets/imagenes/carrusel9.jpeg',
    'assets/imagenes/carrusel10.jpeg'
  ];
  
  indiceActual = 0;
  intervalo: any;

  constructor(private router: Router) {}

  ngOnInit() {
    // Inicia el carrusel automático
    this.intervalo = setInterval(() => {
      this.siguiente();
    }, 5000); // Cada 5 segundos cambia de foto
  }

  ngOnDestroy() {
    // Limpiamos el timer al salir de la web para no gastar memoria
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
  }

  irAServicios() {
    this.router.navigate(['/servicios']);
  }

  siguiente() {
    this.indiceActual = (this.indiceActual + 1) % this.imagenes.length;
  }

  anterior() {
    this.indiceActual = (this.indiceActual - 1 + this.imagenes.length) % this.imagenes.length;
  }
}