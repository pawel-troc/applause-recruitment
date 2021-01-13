import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {Device} from '../model/Device';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private apiClient: ApiService) {
  }

  public getDevices(): Observable<Device[]> {
    return this.apiClient.get<Device[]>(`devices`);
  }
}
