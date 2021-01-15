import {TestBed} from '@angular/core/testing';

import {CountryCodeService} from './country-code.service';
import {ApiService} from './api.service';
import {of} from 'rxjs';

describe('CountryCodeService', () => {
  let countryCodeService: CountryCodeService;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['get']);

    TestBed.configureTestingModule({
      providers: [
        CountryCodeService,
        {provide: ApiService, useValue: apiServiceSpy}
      ]
    });
    countryCodeService = TestBed.get(CountryCodeService);
    apiServiceSpy = TestBed.get(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should be created', () => {
    expect(countryCodeService).toBeTruthy();
  });

  it('should return country codes (apiService called once)', () => {
    const expectedCountryCodes = ['UK', 'PL', 'JP'];
    apiServiceSpy.get.and.returnValue(of(expectedCountryCodes));

    countryCodeService.getCountryCodes().subscribe(
      countryCodes => expect(countryCodes).toEqual(expectedCountryCodes, 'expected country codes'),
      fail
    );

    expect(apiServiceSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should call apiService with correct endpoint', () => {
    apiServiceSpy.get.and.returnValue(of([]));

    countryCodeService.getCountryCodes().subscribe(
      () => {
      },
      fail
    );

    expect(apiServiceSpy.get).toHaveBeenCalledWith('countryCodes');
  });
});
