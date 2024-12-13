import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MovieService } from '../../core/movie.service';
import { MovieListComponent } from '../movie-list/movie-list.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MovieListComponent // Importa el componente aquí
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  query: string = '';
  movies: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  errorMessage: string = '';

  constructor(private movieService: MovieService) {}

  searchMovies() {
    if (this.query.trim()) {
      this.movieService.searchMovies(this.query, this.currentPage).subscribe(
        (response) => {
          this.movies = response.results;
          this.totalPages = response.total_pages;
        },
        (error) => {
          this.errorMessage = 'Error al buscar películas.';
        }
      );
    }
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.searchMovies();
  }
}
