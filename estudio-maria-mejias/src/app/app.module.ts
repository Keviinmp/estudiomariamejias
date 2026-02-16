import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Componentes
import { AppComponent } from './app'; 
import { NavbarComponent } from './shared/navbar/navbar.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { CitaComponent } from './paginas/cita/cita.component';
import { ServiciosComponent } from './paginas/servicios/servicios.component';
import { DetalleServicioComponent } from './paginas/detalle-servicio/detalle-servicio.component';
import { ReservaModalComponent } from './paginas/reserva-modal.component/reserva-modal.component';

// Material
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// Rutas
import { routes } from './app.routes';

// Firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InicioComponent,
    CitaComponent,
    ServiciosComponent,
    DetalleServicioComponent,
    ReservaModalComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    MatDialogModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }