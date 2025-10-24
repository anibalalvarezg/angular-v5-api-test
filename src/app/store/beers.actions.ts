import { Action } from '@ngrx/store';
import { Beer } from '../core/models/beer.model';

export const LOAD_BEERS_SUCCESS = '[Beers] Load Beers Success';
export const DELETE_BEER = '[Beers] Delete Beer';
export const UPDATE_BEER = '[Beers] Update Beer';

export class LoadBeersSuccess implements Action {
  readonly type = LOAD_BEERS_SUCCESS;
  constructor(public payload: Beer[]) {}
}

export class DeleteBeer implements Action {
  readonly type = DELETE_BEER;
  constructor(public payload: string) {}
}

export class UpdateBeer implements Action {
  readonly type = UPDATE_BEER;
  constructor(public payload: Beer) {}
}

export type BeerActions = LoadBeersSuccess | DeleteBeer | UpdateBeer;
