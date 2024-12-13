import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../core/movie.service';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule], // Asegúrate de incluir CommonModule aquí
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  @Input() movies: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.currentPage = params['page'] ? +params['page'] : 1;
      this.loadMovies(this.currentPage);
    });
  }

  loadMovies(page: number) {
    this.movieService.searchMovies('popular', page).subscribe((response) => {
      this.movies = response.results;
      this.totalPages = response.total_pages;
      this.currentPage = page;
      this.movieService.updatePagination(this.currentPage, this.totalPages);
    });
  }

  onPageChange(newPage: number) {
    this.router.navigate(['/movies/page', newPage]);
  }

  goToDetails(id: string) {
    this.router.navigate(['/movie', id]);
  }
}
