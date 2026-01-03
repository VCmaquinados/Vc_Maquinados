import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EquipoTrabajosComponent } from './pages/equipo-trabajos/equipo-trabajos.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'equipo-trabajos', component: EquipoTrabajosComponent },
  { path: '**', redirectTo: '' }
];