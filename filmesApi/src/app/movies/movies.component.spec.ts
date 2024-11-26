import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesComponent } from './movies.component';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  let mockHttpClient: any;

  beforeEach(async () => {
    mockHttpClient = {
      get: jasmine.createSpy('get'),
    };

    await TestBed.configureTestingModule({
      imports: [MoviesComponent],
      providers: [{ provide: HttpClient, useValue: mockHttpClient }],
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load favorites from localStorage', () => {
      spyOn(localStorage, 'getItem').and.returnValue(
        JSON.stringify([{ imdbID: 'tt1234567', Title: 'Favorite Movie' }])
      );

      component.ngOnInit();

      expect(component.favorites).toEqual([
        { imdbID: 'tt1234567', Title: 'Favorite Movie' },
      ]);
    });
  });

  describe('searchMovies', () => {
    it('should populate movies on successful search', () => {
      const mockResponse = {
        Response: 'True',
        Search: [
          { imdbID: 'tt1234567', Title: 'Movie 1' },
          { imdbID: 'tt7654321', Title: 'Movie 2' },
        ],
      };

      mockHttpClient.get.and.returnValue(of(mockResponse));

      component.searchQuery = 'Test';
      component.searchMovies();

      expect(mockHttpClient.get).toHaveBeenCalledWith(
        `https://www.omdbapi.com/?s=Test&apikey=11037ce9`
      );
      expect(component.movies).toEqual(mockResponse.Search);
      expect(component.errorMessage).toBe('');
    });

    it('should set errorMessage on failed search', () => {
      const mockResponse = { Response: 'False', Error: 'Movie not found!' };

      mockHttpClient.get.and.returnValue(of(mockResponse));

      component.searchQuery = 'Invalid';
      component.searchMovies();

      expect(component.movies).toEqual([]);
      expect(component.errorMessage).toBe('Movie not found!');
    });

    it('should handle HTTP error gracefully', () => {
      mockHttpClient.get.and.returnValue(throwError(new Error('Network error')));

      component.searchQuery = 'Test';
      component.searchMovies();

      expect(component.errorMessage).toBe('Erro ao buscar filmes. Tente novamente.');
      expect(component.movies).toEqual([]);
    });
  });

  describe('toggleFavorite', () => {
    it('should add a movie to favorites if it is not already a favorite', () => {
      spyOn(component, 'addFavorite');
      spyOn(component, 'removeFavorite');

      const movie = { imdbID: 'tt1234567', Title: 'Movie 1' };

      component.toggleFavorite(movie);

      expect(component.addFavorite).toHaveBeenCalledWith(movie);
      expect(component.removeFavorite).not.toHaveBeenCalled();
    });

    it('should remove a movie from favorites if it is already a favorite', () => {
      spyOn(component, 'addFavorite');
      spyOn(component, 'removeFavorite');

      const movie = { imdbID: 'tt1234567', Title: 'Movie 1' };
      component.favorites = [movie];

      component.toggleFavorite(movie);

      expect(component.addFavorite).not.toHaveBeenCalled();
      expect(component.removeFavorite).toHaveBeenCalledWith(movie.imdbID);
    });
  });

  describe('addFavorite', () => {
    it('should add a movie to favorites and save to localStorage', () => {
      spyOn(localStorage, 'setItem');
      const movie = { imdbID: 'tt1234567', Title: 'Movie 1' };

      component.addFavorite(movie);

      expect(component.favorites).toContain(movie);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'favorites',
        JSON.stringify(component.favorites)
      );
    });
  });

  describe('removeFavorite', () => {
    it('should remove a movie from favorites and update localStorage', () => {
      spyOn(localStorage, 'setItem');
      const movie = { imdbID: 'tt1234567', Title: 'Movie 1' };
      component.favorites = [movie];

      component.removeFavorite('tt1234567');

      expect(component.favorites).not.toContain(movie);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'favorites',
        JSON.stringify(component.favorites)
      );
    });
  });

  describe('isFavorite', () => {
    it('should return true if the movie is a favorite', () => {
      const movie = { imdbID: 'tt1234567', Title: 'Movie 1' };
      component.favorites = [movie];

      expect(component.isFavorite('tt1234567')).toBeTrue();
    });

    it('should return false if the movie is not a favorite', () => {
      component.favorites = [{ imdbID: 'tt1234567', Title: 'Movie 1' }];

      expect(component.isFavorite('tt7654321')).toBeFalse();
    });
  });
});
