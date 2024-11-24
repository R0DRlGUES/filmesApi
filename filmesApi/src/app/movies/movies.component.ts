import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  searchQuery: string = '';
  movies: any[] = [];
  errorMessage: string = '';
  favorites: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  searchMovies(): void {
    this.http
      .get<any>(`https://www.omdbapi.com/?s=${this.searchQuery}&apikey=11037ce9`)
      .subscribe(
        (response) => {
          if (response.Response === 'True') {
            this.movies = response.Search;
            this.errorMessage = '';
          } else {
            this.movies = [];
            this.errorMessage = response.Error;
          }
        },
        (error) => {
          this.errorMessage = 'Erro ao buscar filmes. Tente novamente.';
        }
      );
  }

  toggleFavorite(movie: any): void {
    const exists = this.favorites.find((fav) => fav.imdbID === movie.imdbID);
    if (exists) {
      this.removeFavorite(movie.imdbID);
    } else {
      this.addFavorite(movie);
    }
  }

  addFavorite(movie: any): void {
    this.favorites.push(movie);
    this.saveFavorites();
  }

  removeFavorite(imdbID: string): void {
    this.favorites = this.favorites.filter((fav) => fav.imdbID !== imdbID);
    this.saveFavorites();
  }

  isFavorite(imdbID: string): boolean {
    return this.favorites.some((fav) => fav.imdbID === imdbID);
  }

  saveFavorites(): void {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  loadFavorites(): void {
    const storedFavorites = localStorage.getItem('favorites');
    this.favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
  }
}
