import { TestBed } from '@angular/core/testing';

import { CountryCodeService } from './country-code.service';

describe('CountryService', () => {
  let service: CountryCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
