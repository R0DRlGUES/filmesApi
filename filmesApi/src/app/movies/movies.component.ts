import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: any[] = [];
  searchQuery: string = 'Avengers';
  private apiUrl = 'https://www.omdbapi.com/';S
  private apiKey = '11037ce9';
  // http://www.omdbapi.com/?i=tt3896198&apikey=11037ce9


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchMovies();
  }

  fetchMovies(): void {
    this.http.get<any>(`${this.apiUrl}?i=${this.searchQuery}&apikey=${this.apiKey}`)
      .subscribe(response => {
        if (response && response.Search) {
          this.movies = response.Search;
        } else {
          console.error('Nenhum filme encontrado.');
          this.movies = [];
        }
      }, error => {
        console.error('Erro ao buscar filmes:', error);
      });
  }
}
