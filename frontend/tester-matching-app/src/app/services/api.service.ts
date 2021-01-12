import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiBaseUrl = 'localhost:8080';

  constructor(private httpClient: HttpClient) {
  }

  public get<T>(endpoint: string, queryParams?: { [param: string]: string | string[] }): Observable<T> {
    return this.httpClient.get<T>(`${this.apiBaseUrl}/${endpoint}`, {
      params: queryParams,
      responseType: 'json'
    });
  }
}

