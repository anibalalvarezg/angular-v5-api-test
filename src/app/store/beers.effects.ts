import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/of';

import {
  LOAD_BEERS,
  LOAD_BEERS_SUCCESS,
  LOAD_BEERS_FAILURE,
  LoadBeersSuccess,
  LoadBeersFailure,
} from './beers.actions';
import { StartLoading, StopLoading } from './ui.actions';
import { BeerDataService } from '../core/services/beer-data.service';
import { BeerState } from './beers.state';

@Injectable()
export class BeersEffects {
  constructor(
    private actions$: Actions,
    private beerDataService: BeerDataService,
    private store: Store<BeerState>
  ) {}

  @Effect()
  loadBeers$: Observable<Action> = this.actions$
    .ofType(LOAD_BEERS)
    .do(() => this.store.dispatch(new StartLoading()))
    .switchMap(() => {
      return this.store.select((state: any) => state.beers).take(1);
    })
    .switchMap((beerState: BeerState) => {
      if (beerState && beerState.beers && beerState.beers.length > 0) {
        return Observable.of(new LoadBeersSuccess(beerState.beers));
      }
      return this.beerDataService
        .getBeers()
        .map(beers => new LoadBeersSuccess(beers))
        .catch(error => Observable.of(new LoadBeersFailure(error)));
    });

  @Effect()
  loadBeersSuccess$: Observable<Action> = this.actions$
    .ofType(LOAD_BEERS_SUCCESS)
    .map(() => new StopLoading());

  @Effect()
  loadBeersFailure$: Observable<Action> = this.actions$
    .ofType(LOAD_BEERS_FAILURE)
    .map(() => new StopLoading());
}
