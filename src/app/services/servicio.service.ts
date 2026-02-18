import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';

export interface Servicio {
  id: number;
  nombre: string;
  imagenes?: string[];
  categoria: string;
  descripcion?: string;
  duracion: string;
  precio: number;
  precioPlus?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  // URLs de la API simulada
  private urlServicios = 'api/servicios'; 
  private urlCitas = 'api/citas';

  constructor(private http: HttpClient) { }

  // 1. Obtener todos los servicios usando GET
  getServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.urlServicios);
  }

  // 2. Obtener un servicio específico por id para el Detalle Real
  getServicio(id: number): Observable<Servicio> {
    return this.http.get<Servicio>(`${this.urlServicios}/${id}`);
  }

  // 3. Enviar la reserva usando POST
  guardarCita(cita: any): Observable<any> {
    return this.http.post(this.urlCitas, cita);
  }
}