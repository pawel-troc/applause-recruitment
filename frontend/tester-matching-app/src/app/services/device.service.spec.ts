import {TestBed} from '@angular/core/testing';

import {DeviceService} from './device.service';
import {ApiService} from './api.service';
import {Device} from '../model/Device';
import {of} from 'rxjs';

describe('DeviceService', () => {
  let deviceService: DeviceService;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['get']);

    TestBed.configureTestingModule({
      providers: [
        DeviceService,
        {provide: ApiService, useValue: apiServiceSpy}
      ]
    });
    deviceService = TestBed.get(DeviceService);
    apiServiceSpy = TestBed.get(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should be created', () => {
    expect(deviceService).toBeTruthy();
  });

  it('should return devices', () => {
    const expectedDevices: Device[] = [
      {id: 1, description: 'iPhone X'},
      {id: 2, description: 'Xiaomi Mi6'}
    ];

    apiServiceSpy.get.and.returnValue(of(expectedDevices));

    deviceService.getDevices().subscribe(
      devices => expect(devices).toEqual(expectedDevices),
      fail
    );

    expect(apiServiceSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should call apiService with correct endpoint', () => {
    apiServiceSpy.get.and.returnValue(of([]));

    deviceService.getDevices().subscribe(
      () => {
      },
      fail
    );

    expect(apiServiceSpy.get).toHaveBeenCalledWith('devices');
  });
});
