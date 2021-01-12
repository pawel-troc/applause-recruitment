import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {iif, Observable, of} from 'rxjs';
import {Device} from '../model/Device';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private devicesCache!: Device[];

  constructor(private apiClient: ApiService) {
  }

  public getDevices(): Observable<Device[]> {
    return iif(
      () => !!this.devicesCache,
      of(this.devicesCache),
      this.apiClient.get<Device[]>(`/devices`)
        .pipe(
          tap((devices) => this.devicesCache = devices)
        )
    );
  }
}
