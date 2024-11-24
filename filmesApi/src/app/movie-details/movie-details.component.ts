import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  movieId: string | null = null;
  movie: any = null;

  private apiUrl = 'https://www.omdbapi.com/';
  private apiKey = '11037ce9'; // Sua API Key

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('id');
    if (this.movieId) {
      this.getMovieDetails(this.movieId);
    }
  }

  getMovieDetails(id: string): void {
    this.http
      .get<any>(`${this.apiUrl}?i=${id}&apikey=${this.apiKey}`)
      .subscribe(
        (response) => {
          this.movie = response;
        },
        (error) => {
          console.error('Erro ao buscar detalhes do filme:', error);
        }
      );
  }
}
