import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  { 
    path: 'equipo-trabajos', 
    loadComponent: () => import('./pages/equipo-trabajos/equipo-trabajos.component').then(m => m.EquipoTrabajosComponent)
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];