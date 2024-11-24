import { Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

export const routes: Routes = [
  { path: '', component: MoviesComponent }, // Página inicial
  { path: 'details/:id', component: MovieDetailsComponent }, // Página de detalhes
];
