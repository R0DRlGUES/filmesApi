import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MovieDetailsComponent } from './movie-details.component';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let mockHttpClient: any;

  beforeEach(async () => {
    mockHttpClient = {
      get: jasmine.createSpy('get')
    };

    await TestBed.configureTestingModule({
      imports: [MovieDetailsComponent],
      providers: [
        { provide: HttpClient, useValue: mockHttpClient },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'id' ? 'tt1234567' : null)
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch movie details successfully', () => {
    const mockMovieDetails = {
      Title: 'Mock Movie',
      Year: '2023',
      Genre: 'Action',
      imdbID: 'tt1234567'
    };

    mockHttpClient.get.and.returnValue(of(mockMovieDetails));

    component.ngOnInit();

    expect(mockHttpClient.get).toHaveBeenCalledWith(
      'https://www.omdbapi.com/?i=tt1234567&apikey=11037ce9'
    );
    expect(component.movie).toEqual(mockMovieDetails);
  });

  it('should handle error when fetching movie details', () => {
    const mockError = new ErrorEvent('Network error');
    spyOn(console, 'error');
    mockHttpClient.get.and.returnValue(throwError(mockError));

    component.ngOnInit();

    expect(mockHttpClient.get).toHaveBeenCalledWith(
      'https://www.omdbapi.com/?i=tt1234567&apikey=11037ce9'
    );
    expect(console.error).toHaveBeenCalledWith(
      'Erro ao buscar detalhes do filme:',
      mockError
    );
    expect(component.movie).toBeNull();
  });
});
