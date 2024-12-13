import { Routes } from '@angular/router';
import { SearchComponent } from './features/search/search.component';
import { MovieListComponent } from './features/movie-list/movie-list.component';

export const appRoutes: Routes = [
  { path: '', component: SearchComponent },
{ path: 'movies/page/:page', component: MovieListComponent },
];
