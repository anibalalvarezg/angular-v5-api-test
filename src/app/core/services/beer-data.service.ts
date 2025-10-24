// src/app/core/services/beer-data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

import { environment } from '../../../environments/environment';
import { StartLoading, StopLoading } from '../../store/ui.actions';
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
    this.store.dispatch(new StartLoading());

    return Observable.of(null)
      .switchMap(() => {
        return this.store.select((state: any) => state.beers).take(1);
      })
      .switchMap((beerState: BeerState) => {
        if (beerState && beerState.beers && beerState.beers.length > 0) {
          return Observable.of(beerState.beers);
        }

        return this.http
          .get<BeerApiResponse>(this.apiUrl, {
            headers: this.apiHeaders,
          })
          .map(response => response.data)
          .catch(() => {
            // Si hay error, se usa el mock-api.json (puede que se acaben los token de la API gratuitos)
            return this.http
              .get<any>('assets/mock-api.json')
              .map(mockResponse => mockResponse.data);
          })
          .do(beers => {
            this.store.dispatch(new LoadBeersSuccess(beers));
          });
      })
      .finally(() => {
        this.store.dispatch(new StopLoading());
      })
      .toPromise();
  }
}
