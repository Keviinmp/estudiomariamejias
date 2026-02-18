import { Routes } from '@angular/router';

import { InicioComponent } from './paginas/inicio/inicio.component';
import { ServiciosComponent } from './paginas/servicios/servicios.component';
import { DetalleServicioComponent } from './paginas/detalle-servicio/detalle-servicio.component';
import { ResenasComponent } from './paginas/resenas/resenas.component';
import { Component } from '@angular/core';

export const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'servicios', component: ServiciosComponent },
    { path: 'detalle/:id', component: DetalleServicioComponent },
    { path: 'resenas', component: ResenasComponent }
];
