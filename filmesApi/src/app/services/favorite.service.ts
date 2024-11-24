import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private storageKey = 'favorites';

  getFavorites(): any[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  addFavorite(movie: any): void {
    const favorites = this.getFavorites();
    if (!favorites.find((item) => item.imdbID === movie.imdbID)) {
      favorites.push(movie);
      localStorage.setItem(this.storageKey, JSON.stringify(favorites));
    }
  }

  removeFavorite(id: string): void {
    const favorites = this.getFavorites().filter((item) => item.imdbID !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(favorites));
  }

  isFavorite(id: string): boolean {
    return this.getFavorites().some((item) => item.imdbID === id);
  }
}
