import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OmdbService {
  private apiUrl = 'https://www.omdbapi.com/';
  private apiKey = '11037ce9';

  constructor(private http: HttpClient) {}

  getMovies(query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?s=${query}&apikey=${this.apiKey}`);
  }
}
