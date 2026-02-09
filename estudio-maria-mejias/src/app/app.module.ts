import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app'; 

import { NavbarComponent } from './shared/navbar/navbar.component';

import { InicioComponent } from './paginas/inicio/inicio.component';
import { CitaComponent } from './paginas/cita/cita.component';
import { ServiciosComponent } from './paginas/servicios/servicios.component';
import { DetalleServicioComponent } from './paginas/detalle-servicio/detalle-servicio.component';

import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InicioComponent,
    CitaComponent,
    ServiciosComponent,
    DetalleServicioComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }