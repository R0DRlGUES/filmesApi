import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    MoviesComponent,
    { provide: AppComponent }
  ]
};
