import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Device} from '../model/Device';
import {Observable} from 'rxjs';
import {MatchedTester} from '../model/MatchedTester';

@Injectable({
  providedIn: 'root'
})
export class TesterMatchingService {

  constructor(private apiClient: ApiService) { }

  public matchTesters(countryCodes: string[], deviceIds: string): Observable<MatchedTester[]> {
    return this.apiClient.get<MatchedTester[]>(`testers`, {
      countryCodes,
      deviceIds,
    });
  }
}
