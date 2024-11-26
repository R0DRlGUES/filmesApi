import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MovieDetailsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => {
                  if (key === 'id') return 'tt1234567';
                  return null;
                },
              },
            },
          },
        },
      ],
    }).compileComponents();

    // Criar o componente e injetar o HttpTestingController
    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);

    // Interceptar a requisição inicial do ngOnInit
    const req = httpMock.expectOne(
      `https://www.omdbapi.com/?i=tt1234567&apikey=11037ce9`
    );
    req.flush({
      Title: 'Mock Movie',
      Year: '2023',
      Genre: 'Action',
      imdbID: 'tt1234567',
    });

    fixture.detectChanges();
  });

  afterEach(() => {
    if (httpMock) {
      httpMock.verify(); // Verificar se todas as requisições foram tratadas
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get movie ID from route parameters', () => {
    expect(component.movieId).toBe('tt1234567');
  });

  it('should fetch movie details successfully', () => {
    const mockMovieDetails = {
      Title: 'Mock Movie',
      Year: '2023',
      Genre: 'Action',
      imdbID: 'tt1234567',
    };

    // Nova chamada explícita
    component.getMovieDetails('tt1234567');

    // Interceptar a nova requisição
    const req = httpMock.expectOne(
      `https://www.omdbapi.com/?i=tt1234567&apikey=11037ce9`
    );
    expect(req.request.method).toBe('GET');

    req.flush(mockMovieDetails);

    expect(component.movie).toEqual(mockMovieDetails);
  });

  it('should handle error when fetching movie details', () => {
    spyOn(console, 'error');

    // Nova chamada explícita
    component.getMovieDetails('tt1234567');

    // Interceptar a nova requisição
    const req = httpMock.expectOne(
      `https://www.omdbapi.com/?i=tt1234567&apikey=11037ce9`
    );
    expect(req.request.method).toBe('GET');

    req.error(new ErrorEvent('Network error'));

    expect(console.error).toHaveBeenCalledWith(
      'Erro ao buscar detalhes do filme:',
      jasmine.any(Error)
    );
    expect(component.movie).toBeNull();
  });
});
