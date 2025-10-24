import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from '../../../environments/environment';
import { Beer, BeerApiResponse } from '../models/beer.model';

@Injectable()
export class BeerDataService {
  private apiUrl = environment.api.url;
  private apiHeaders = new HttpHeaders()
    .set('x-rapidapi-host', environment.api.host)
    .set('x-rapidapi-key', environment.api.key);

  constructor(private http: HttpClient) {}

  public getBeers(): Observable<Beer[]> {
    return this.http
      .get<BeerApiResponse>(this.apiUrl, {
        headers: this.apiHeaders,
      })
      .map(response => response.data)
      .catch(() => {
        return this.http
          .get<any>('assets/mock-api.json')
          .map(mockResponse => mockResponse.data);
      });
  }
}
