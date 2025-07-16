import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [

      { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
      {
        path: 'auth/login',
        loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'auth/register',
        loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)
      },
      {
        path: 'appointments/reservar',
        loadComponent: () =>
        import('./appointments/reservar-turno/reservar-turno.component').then(m => m.ReservarTurnoComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'appointments/mis-turnos',
        loadComponent: () =>
        import('./appointments/mis-turnos/mis-turnos.component').then(m => m.MisTurnosComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'admin',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./admin/admin.module').then(m => m.AdminModule)
      },
      { path: '**', redirectTo: 'auth/login' }
];

