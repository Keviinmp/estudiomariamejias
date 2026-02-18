import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnInit } from '@angular/core'; // Añadimos OnInit
import { ActivatedRoute } from '@angular/router'; // <--- Para leer el ID (Punto 8)
import { Servicio, ServicioService } from '../../services/servicio.service'; // <--- Importamos el ServicioService

@Component({
  selector: 'app-detalle-servicio',
  standalone: false,
  templateUrl: './detalle-servicio.component.html',
  styleUrls: ['./detalle-servicio.component.css']
})
export class DetalleServicioComponent implements OnInit { // <--- Implementamos OnInit

  @Input() servicio!: Servicio;
  @Output() cerrar = new EventEmitter<void>();
  
  cargando: boolean = false; // <--- Para el mensaje "Cargando..." (Punto 9)

  @ViewChild('imagenesContainer') imagenesContainer?: ElementRef<HTMLDivElement>;

  // Inyectamos las herramientas necesarias
  constructor(
    private route: ActivatedRoute,       // <--- Herramienta para leer la URL
    private servicioService: ServicioService // <--- Herramienta para usar HttpClient
  ) {}

  ngOnInit(): void {
    // Si NO nos pasan un servicio por @Input, lo buscamos en la URL (Punto 8)
    if (!this.servicio) {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      if (id) {
        this.cargando = true; // Mostramos "Cargando..."
        this.servicioService.getServicio(id).subscribe(data => {
          this.servicio = data;
          this.cargando = false; // Quitamos el "Cargando..."
        });
      }
    }
  }

  // Tus funciones de scroll y displayedImages se quedan IGUAL
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