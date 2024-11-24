import { TestBed } from '@angular/core/testing';

import { OmdbService } from './services/omdb.service';

describe('OmdbService', () => {
  let service: OmdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OmdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
