import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Servicio, ServicioService } from '../../services/servicio.service';

@Component({
  selector: 'app-detalle-servicio',
  standalone: false,
  templateUrl: './detalle-servicio.component.html',
  styleUrls: ['./detalle-servicio.component.css']
})
export class DetalleServicioComponent implements OnInit {

  @Input() servicio!: Servicio;
  @Output() cerrar = new EventEmitter<void>();
  
  cargando: boolean = false;

  @ViewChild('imagenesContainer') imagenesContainer?: ElementRef<HTMLDivElement>;

  // Inyectamos las herramientas necesarias
  constructor(
    private route: ActivatedRoute,
    private servicioService: ServicioService
  ) {}

  ngOnInit(): void {
    if (!this.servicio) {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      if (id) {
        this.cargando = true; // Mostramos "Cargando..."
        this.servicioService.getServicio(id).subscribe(data => {
          this.servicio = data;
          this.cargando = false;
        });
      }
    }
  }


  displayedImages(): string[] {
    return this.servicio?.imagenes || [];
  }   

  scrollLeft() {
    this.imagenesContainer?.nativeElement.scrollBy({ left: -200, behavior: 'smooth' });
  }

  scrollRight() {
    this.imagenesContainer?.nativeElement.scrollBy({ left: 200, behavior: 'smooth' });
  }
}