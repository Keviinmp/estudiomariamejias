import { Routes } from '@angular/router';

import { InicioComponent } from './paginas/inicio/inicio.component';
import { ServiciosComponent } from './paginas/servicios/servicios.component';
import { DetalleServicioComponent } from './paginas/detalle-servicio/detalle-servicio.component';
import { CitaComponent } from './paginas/cita/cita.component';

export const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'servicios', component: ServiciosComponent },
    { path: 'cita', component: CitaComponent}
];
