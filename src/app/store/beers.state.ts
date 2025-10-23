import { Beer } from '../core/models/beer.model';

export interface BeerState {
  beers: Beer[];
  loaded: boolean;
}

export const initialState: BeerState = {
  beers: [],
  loaded: false,
};
