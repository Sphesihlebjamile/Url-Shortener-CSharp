import { Routes } from '@angular/router';
import { Longurl } from './longurl/longurl';
import { NotFound } from './not-found';
import { Urlshortener } from './urlshortener/urlshortener';

export const routes: Routes = [
  { path: '', component: Urlshortener },
  { path: '404', component: NotFound },
  { path: ':shortUrlCode', component: Longurl },
  { path: '**', redirectTo: '/404' },
];
