import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../core/movie.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  movie: any = null;
  movieCast: any[] = [];
  isLoading = true;

  constructor(private movieService: MovieService,private errorHandler: ErrorHandlerService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.loadMovieDetails(movieId);
      this.loadMovieCredits(movieId);
    }
  }

  private loadMovieDetails(movieId: string): void {
    this.movieService.getMovieDetails(movieId).subscribe(
      (data) => {
        this.movie = data;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.errorHandler.showError('Error al obtener detalles de la película.');
      }
    );
  }

  private loadMovieCredits(movieId: string): void {
    this.movieService.getMovieCredits(movieId).subscribe(
      (data) => {
        this.movieCast = data.cast.slice(0, 5);
      },
      (error) => {
        this.isLoading = false;
        this.errorHandler.showError('Error al obtener detalles de la película.');
      }
    );
  }

  get genres(): string {
    return this.movie?.genres?.map((genre: any) => genre.name).join(', ') || 'N/A';
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
