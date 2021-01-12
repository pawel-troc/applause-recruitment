import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {iif, Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryCodeService {

  private countryCache!: string[];

  constructor(private apiClient: ApiService) {
  }

  public getCountryCodes(): Observable<string[]> {
    return iif(
      () => !!this.countryCache,
      of(this.countryCache),
      this.apiClient.get<string[]>(`/devices`)
        .pipe(
          tap((countryCodes) => this.countryCache = countryCodes)
        )
    );
  }
}
