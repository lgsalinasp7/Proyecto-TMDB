import { Injectable } from '@angular/core';
import { apiConfig } from '../api.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl = apiConfig.apiUrl;
  private apiKey = apiConfig.apiKey;
  private currentPageSource = new BehaviorSubject<number>(1);
  private totalPagesSource = new BehaviorSubject<number>(1);

  currentPage$ = this.currentPageSource.asObservable();
  totalPages$ = this.totalPagesSource.asObservable();

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) { }

  // Buscar películas por título
  searchMovies(query: string, page: number = 1): Observable<any> {
    const url = `${this.apiUrl}/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(query)}&language=en-US&page=${page}`;


    const headers = new HttpHeaders({
      'accept': 'application/json',
    });

    return this.http.get<any>(url, { headers }).pipe(
      catchError((error) => {
        this.errorHandler.showError('Error al buscar películas.');
        throw error;
      })
    );
  }

  getMovieDetails(id: string): Observable<any> {
    const url = `${this.apiUrl}/movie/${id}?api_key=${this.apiKey}&language=en-US`;

    const headers = new HttpHeaders({
      'accept': 'application/json',
    });

    return this.http.get<any>(url, { headers }).pipe(
      catchError((error) => {
        this.errorHandler.showError('Error al obtener detalles de la película.');
        throw error;
      })
    );
  }

  getMovieCredits(id: string): Observable<any> {
    const url = `${this.apiUrl}/movie/${id}/credits?api_key=${this.apiKey}`;

    const headers = new HttpHeaders({
      'accept': 'application/json',
    });

    return this.http.get<any>(url, { headers }).pipe(
      catchError((error) => {
        this.errorHandler.showError('Error al obtener los créditos de la película.');
        throw error;
      })
    );
  }

  updatePagination(currentPage: number, totalPages: number): void {
    this.currentPageSource.next(currentPage);
    this.totalPagesSource.next(totalPages);
  }


}
