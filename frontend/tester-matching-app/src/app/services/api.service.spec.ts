import {TestBed} from '@angular/core/testing';

import {ApiService} from './api.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('ApiService', () => {
  let apiService: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    apiService = TestBed.get(ApiService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(apiService).toBeTruthy();
  });

  it('should call httpClient get', () => {
    const expectedData = {test: 'test'};

    apiService.get('test-endpoint', {t: 'test'}).subscribe(
      data => expect(data).toEqual(expectedData),
      fail
    );

    const request = httpTestingController.expectOne(`${apiService.apiBaseUrl}/test-endpoint?t=test`);
    expect(request.request.method).toBe('GET');
    request.flush(expectedData);
  });
});
