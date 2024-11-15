import { Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'modules',
    loadChildren: () =>
      import('./modules/home/home.routes').then((m) => m.routes),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
