import { Action } from '@ngrx/store';
import { Beer } from '../core/models/beer.model';

export const LOAD_BEERS = '[Beers] Load Beers';
export const LOAD_BEERS_SUCCESS = '[Beers] Load Beers Success';
export const LOAD_BEERS_FAILURE = '[Beers] Load Beers Failure';
export const ADD_BEER = '[Beers] Add Beer';
export const DELETE_BEER = '[Beers] Delete Beer';
export const UPDATE_BEER = '[Beers] Update Beer';

export class LoadBeers implements Action {
  readonly type = LOAD_BEERS;
}

export class LoadBeersSuccess implements Action {
  readonly type = LOAD_BEERS_SUCCESS;
  constructor(public payload: Beer[]) {}
}

export class LoadBeersFailure implements Action {
  readonly type = LOAD_BEERS_FAILURE;
  constructor(public payload: any) {}
}

export class AddBeer implements Action {
  readonly type = ADD_BEER;
  constructor(public payload: Beer) {}
}

export class DeleteBeer implements Action {
  readonly type = DELETE_BEER;
  constructor(public payload: string) {}
}

export class UpdateBeer implements Action {
  readonly type = UPDATE_BEER;
  constructor(public payload: Beer) {}
}

export type BeerActions =
  | LoadBeers
  | LoadBeersSuccess
  | LoadBeersFailure
  | AddBeer
  | DeleteBeer
  | UpdateBeer;
