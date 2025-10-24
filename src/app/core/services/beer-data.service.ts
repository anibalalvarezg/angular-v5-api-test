import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from '../../../environments/environment';
import { Beer, BeerApiResponse, BeerApiData } from '../models/beer.model';

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
      .map(response => this.mapApiDataToBeers(response.data))
      .catch(() => {
        return this.http
          .get<any>('assets/mock-api.json')
          .map(mockResponse => this.mapApiDataToBeers(mockResponse.data));
      });
  }

  private mapApiDataToBeers(apiData: BeerApiData[]): Beer[] {
    return apiData.map(item => ({
      sku: item.sku,
      name: item.name,
      brewery: item.brewery,
      abv: item.abv,
      ibu: item.ibu,
      country: item.country,
    }));
  }
}
