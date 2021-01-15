import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public apiBaseUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {
  }

  public get<T>(endpoint: string, queryParams?: any): Observable<T> {
    let requestParams = new HttpParams();

    for (const key in queryParams) {
      if (queryParams.hasOwnProperty(key)) {
        requestParams = requestParams.set(key, queryParams[key]);
      }
    }

    return this.httpClient.get<T>(`${this.apiBaseUrl}/${endpoint}`, {
      params: requestParams,
      responseType: 'json'
    });
  }
}

