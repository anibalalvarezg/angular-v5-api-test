import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BeerState } from './beers.state';
import { Beer } from '../core/models/beer.model';

export const selectBeerState = createFeatureSelector<BeerState>('beers');

export const selectAllBeers = createSelector(
  selectBeerState,
  (state: BeerState) => state.beers
);

export const selectBeersLoaded = createSelector(
  selectBeerState,
  (state: BeerState) => state.loaded
);

export const selectBeerBySku = (sku: string) =>
  createSelector(selectAllBeers, (beers: Beer[]) =>
    beers.find(b => b.sku === sku)
  );
