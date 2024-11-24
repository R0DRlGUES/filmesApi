import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  movieId: string | null = null;
  movie: any = null; // Adicione esta propriedade

  private apiUrl = 'https://www.omdbapi.com/';
  private apiKey = '11037ce9'; // Sua API Key

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    // Obter o ID do filme da rota
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
          this.movie = response; // Salva os detalhes do filme
        },
        (error) => {
          console.error('Erro ao buscar detalhes do filme:', error);
        }
      );
  }
}
