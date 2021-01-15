import {TestBed} from '@angular/core/testing';

import {TesterMatchingService} from './tester-matching.service';
import {ApiService} from './api.service';
import {of} from 'rxjs';
import {MatchedTester} from '../model/MatchedTester';

describe('TesterMatchingService', () => {
  let testerMatchingService: TesterMatchingService;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['get']);

    TestBed.configureTestingModule({
      providers: [
        TesterMatchingService,
        {provide: ApiService, useValue: apiServiceSpy}
      ]
    });

    testerMatchingService = TestBed.get(TesterMatchingService);
    apiServiceSpy = TestBed.get(ApiService);
  });

  it('should be created', () => {
    expect(testerMatchingService).toBeTruthy();
  });

  it('should return matched testers (apiService called once)', () => {
    const expectedTesters: MatchedTester[] = [
      {id: 1, firstName: 'Roy', lastName: 'Jones', foundBugsQuantity: 10},
      {id: 2, firstName: 'Bob', lastName: 'Martinez', foundBugsQuantity: 0},
    ];

    apiServiceSpy.get.and.returnValue(of(expectedTesters));

    testerMatchingService.matchTesters([], []).subscribe(
      testers => expect(testers).toEqual(expectedTesters),
      fail
    );

    expect(apiServiceSpy.get.calls.count()).toBe(1);
  });

  it('should call apiService with correct params', () => {
    const expectedCountryCodes = ['JP', 'UK'];
    const expectedDeviceIds = ['1', '2'];
    const expectedEndpoint = 'testers';

    apiServiceSpy.get.and.returnValue(of([]));

    testerMatchingService.matchTesters(expectedCountryCodes, expectedDeviceIds).subscribe(
      () => {
      },
      fail
    );

    expect(apiServiceSpy.get).toHaveBeenCalledWith(expectedEndpoint, {
      countryCodes: expectedCountryCodes,
      deviceIds: expectedDeviceIds
    });
  });
});
