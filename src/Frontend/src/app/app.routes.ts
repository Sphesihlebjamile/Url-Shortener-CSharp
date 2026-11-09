import { Routes } from '@angular/router';
import { Longurl } from './longurl/longurl';
import { NotFound } from './not-found';
import { Home } from './pages/urlshortener/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: '404', component: NotFound },
  { path: ':shortUrlCode', component: Longurl },
  { path: '**', redirectTo: '/404' },
];
