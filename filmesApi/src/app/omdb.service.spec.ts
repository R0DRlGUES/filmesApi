import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OmdbService {
  private apiUrl = 'https://www.omdbapi.com/';
  private apiKey = '11037ce9'; // Sua chave de API

  constructor(private http: HttpClient) {}

  getMovies(searchQuery: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?s=${searchQuery}&apikey=${this.apiKey}`);
  }

  getMovieDetails(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?i=${id}&apikey=${this.apiKey}`);
  }
}
