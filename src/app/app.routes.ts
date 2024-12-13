import { Routes } from '@angular/router';
import { SearchComponent } from './features/search/search.component';
import { MovieDetailsComponent } from './features/movie-details/movie-details.component';

export const appRoutes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'movies/page/:page', component: SearchComponent }
];
