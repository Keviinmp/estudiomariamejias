import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Servicio } from '../../services/servicio.service';

@Component({
  selector: 'app-detalle-servicio',
  standalone: false,
  templateUrl: './detalle-servicio.component.html',
  styleUrls: ['./detalle-servicio.component.css']
})
export class DetalleServicioComponent {

  @Input() servicio!: Servicio;
  @Output() cerrar = new EventEmitter<void>();

  @ViewChild('imagenesContainer') imagenesContainer?: ElementRef<HTMLDivElement>;

  displayedImages(): string[] {
    return this.servicio?.imagenes || [];
  }  

  // Scroll con flechas
  scrollLeft() {
    this.imagenesContainer?.nativeElement.scrollBy({ left: -200, behavior: 'smooth' });
  }

  scrollRight() {
    this.imagenesContainer?.nativeElement.scrollBy({ left: 200, behavior: 'smooth' });
  }
}
