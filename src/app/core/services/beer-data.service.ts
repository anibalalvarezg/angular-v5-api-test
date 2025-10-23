import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../../environments/environment';
import { BeerState } from '../../store/beers.state';
import { LoadBeersSuccess } from '../../store/beers.actions';
import { BeerApiResponse } from '../models/beer.model';

@Injectable()
export class BeerDataService {
  private apiUrl = environment.api.url;
  private apiHeaders = new HttpHeaders()
    .set('x-rapidapi-host', environment.api.host)
    .set('x-rapidapi-key', environment.api.key);

  constructor(private http: HttpClient, private store: Store<BeerState>) {}

  public load(): Promise<any> {
    return this.http
      .get<BeerApiResponse>(this.apiUrl, { headers: this.apiHeaders })
      .map(response => response.data)
      .do(beers => {
        this.store.dispatch(new LoadBeersSuccess(beers));
      })
      .toPromise();
  }
}
