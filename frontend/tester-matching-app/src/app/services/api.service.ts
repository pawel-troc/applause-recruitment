import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiBaseUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {
  }

  public get<T>(endpoint: string, queryParams?: any): Observable<T> {
    let requestParams = new HttpParams();

    // TODO forin
    // tslint:disable-next-line:forin
    for (const k in queryParams) {
      requestParams = requestParams.set(k, queryParams[k]);
    }

    return this.httpClient.get<T>(`${this.apiBaseUrl}/${endpoint}`, {
      params: requestParams,
      responseType: 'json'
    });
  }
}

