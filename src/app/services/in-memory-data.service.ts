import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const servicios = [
     // Manicura permanente
    { id: 1, nombre: 'Manicura permanente con refuerzo', imagenes: [
      'assets/imagenes/man1.jpeg',
      'assets/imagenes/man2.jpeg',
      'assets/imagenes/man3.jpeg',
      'assets/imagenes/man4.jpeg'
      ],
       categoria: 'Manicura permanente', duracion: '1h', precio: 19 },
      { id: 2, nombre: 'Decoración de uñas', imagenes: [
        'assets/imagenes/deco1.jpeg',
        'assets/imagenes/deco2.jpeg',
        'assets/imagenes/deco3.jpeg',
        'assets/imagenes/deco4.jpeg',
        'assets/imagenes/deco5.jpeg',
        'assets/imagenes/deco6.jpeg',
        'assets/imagenes/deco7.jpeg',
        'assets/imagenes/deco8.jpeg'
      ],
        categoria: 'Manicura permanente', duracion: '10min', precio: 2, precioPlus: true },
      { id: 3, nombre: 'Retirada esmalte permanente', categoria: 'Manicura permanente', duracion: '20min', precio: 8 },
    
      // Uñas acrílicas
      { id: 4, nombre: 'Primera puesta uñas acrílicas', imagenes: [ 
        'assets/imagenes/acri1.jpeg',
        'assets/imagenes/acri2.jpeg',
        'assets/imagenes/acri3.jpeg'
      ], 
        categoria: 'Uñas acrílicas', duracion: '1h 45min', precio: 32 },
      { id: 5, nombre: 'Relleno uñas acrílicas', imagenes: [
        'assets/imagenes/rell1.jpeg',
      ], 
        categoria: 'Uñas acrílicas', duracion: '1h 15min', precio: 27 },
      { id: 6, nombre: 'Decoración de uñas', imagenes: [
        'assets/imagenes/decoacri1.jpeg',
        'assets/imagenes/decoacri2.jpeg',
        'assets/imagenes/decoacri3.jpeg',
        'assets/imagenes/decoacri4.jpeg',
      ], 
        categoria: 'Uñas acrílicas', duracion: '10min', precio: 2, precioPlus: true },
      { id: 7, nombre: 'Uña rota', categoria: 'Uñas acrílicas', duracion: '10min', precio: 2, precioPlus: true },
      { id: 8, nombre: 'Mano guitarrista', categoria: 'Uñas acrílicas', descripcion: 'Mano con acrílico para guitarristas', duracion: '30min', precio: 15 },
      { id: 9, nombre: 'Retirada de acrílico', categoria: 'Uñas acrílicas', duracion: '40min', precio: 12 },
    
      // Manicura clásica
      { id: 10, nombre: 'Manicura clásica', categoria: 'Manicura clásica', duracion: '35min', precio: 12 },
    
      // Pedicura
      { id: 11, nombre: 'Pedicura completa con esmalte', categoria: 'Pedicura', duracion: '1h', precio: 28 },
      { id: 12, nombre: 'Pedicura completa sin esmalte', categoria: 'Pedicura', duracion: '1h', precio: 24 },
      { id: 13, nombre: 'Pedicura completa tratamiento DETOX con esmalte', categoria: 'Pedicura', duracion: '1h 15min', precio: 40 },
      { id: 14, nombre: 'Pedicura completa tratamiento DETOX sin esmalte', categoria: 'Pedicura', duracion: '1h 15min', precio: 35 },
      { id: 15, nombre: 'Pedicura exprés con esmalte', categoria: 'Pedicura', duracion: '40min', precio: 19 },
      { id: 16, nombre: 'Pedicura exprés sin esmalte', categoria: 'Pedicura', duracion: '30min', precio: 15 },
    
      // Depilación con hilo
      { id: 17, nombre: 'Depilación cejas con hilo', imagenes: [
        'assets/imagenes/dep1.jpeg',
        'assets/imagenes/dep2.jpeg',
        'assets/imagenes/dep3.jpeg',
        'assets/imagenes/dep4.jpeg',
      ], 
        categoria: 'Depilación con hilo', duracion: '15min', precio: 8 },
      { id: 18, nombre: 'Depilación bozo con hilo', categoria: 'Depilación con hilo', duracion: '10min', precio: 6 },
      { id: 19, nombre: 'Depilación cejas con hilo + tinte', imagenes: [
        'assets/imagenes/deptin1.jpeg',
      ],categoria: 'Depilación con hilo', duracion: '25min', precio: 16 },
      { id: 20, nombre: 'Tinte de ceja', categoria: 'Depilación con hilo', descripcion: 'Solo tinte de cejas', duracion: '10min', precio: 10 },
      { id: 21, nombre: 'Depilación mentón con hilo', categoria: 'Depilación con hilo', duracion: '10min', precio: 6 },
      
      // Masajes
      { id: 22, nombre: 'Masaje relajante corporal', categoria: 'Masajes', duracion: '45min', precio: 30 },
      { id: 23, nombre: 'Masaje de pies', categoria: 'Masajes', duracion: '15min', precio: 15 },
    
      // Pestañas
      { id: 24, nombre: 'Primera puesta pestañas pelo a pelo', categoria: 'Pestañas', duracion: '1h 30min', precio: 40 },
      { id: 25, nombre: 'Relleno de pestañas pelo a pelo', categoria: 'Pestañas', duracion: '1h 30min', precio: 30 },
      { id: 26, nombre: 'Primera puesta pestañas volumen', imagenes: [
        'assets/imagenes/pest1.jpeg',
        'assets/imagenes/pest2.jpeg',
      ], 
        categoria: 'Pestañas', duracion: '1h 30min', precio: 50 },
      { id: 27, nombre: 'Relleno de pestañas volumen', categoria: 'Pestañas', duracion: '1h 30min', precio: 40 },
      { id: 28, nombre: 'Lifting de pestañas con tinte', categoria: 'Pestañas', duracion: '1h', precio: 40 },
    
      // Higiene facial
      { id: 29, nombre: 'Higiene facial', categoria: 'Higiene facial', duracion: '1h', precio: 45 }
    ];
    const citas = [];
    return { servicios };
  }
}