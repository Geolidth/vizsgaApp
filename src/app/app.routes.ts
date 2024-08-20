import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { PublicComponent } from './public/public.component';

export const routes: Routes = [
  { path: '', redirectTo: 'public', pathMatch: 'full' },
  { path: 'public', component: PublicComponent },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.routes),
  },
  {
    path: 'news',
    canActivate: [authGuard],
    loadChildren: () => import('./news/news.routes').then((m) => m.routes),
  },
];
