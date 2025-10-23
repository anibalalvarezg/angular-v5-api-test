import { Action } from '@ngrx/store';
import { Beer } from '../core/models/beer.model';

export const LOAD_BEERS_SUCCESS = '[Beers] Load Beers Success';

export class LoadBeersSuccess implements Action {
  readonly type = LOAD_BEERS_SUCCESS;
  constructor(public payload: Beer[]) {}
}

export type BeerActions = LoadBeersSuccess;
