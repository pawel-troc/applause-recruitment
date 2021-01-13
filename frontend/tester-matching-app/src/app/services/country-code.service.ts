import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryCodeService {

  constructor(private apiClient: ApiService) {
  }

  public getCountryCodes(): Observable<string[]> {
    return this.apiClient.get<string[]>(`countryCodes`);
  }
}
