import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../core/movie.service';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  movie: any = null;

  constructor(private movieService: MovieService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.movieService.getMovieDetails(movieId).subscribe(
        (data) => {
          this.movie = data;
        },
        (error) => {
          console.error('Error fetching movie details:', error);
        }
      );
    }
  }

  get genres(): string {
    return this.movie?.genres?.map((genre: any) => genre.name).join(', ') || 'N/A';
  }

  get cast(): string {
    return this.movie?.cast?.slice(0, 5).map((actor: any) => actor.name).join(', ') || 'N/A';
  }
}
