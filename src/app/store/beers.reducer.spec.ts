import { beerReducer } from './beers.reducer';
import { initialState, BeerState } from './beers.state';
import {
  LoadBeers,
  LoadBeersSuccess,
  LoadBeersFailure,
  AddBeer,
  DeleteBeer,
  UpdateBeer,
} from './beers.actions';
import { Beer } from '../core/models/beer.model';

fdescribe('BeerReducer', () => {
  describe('initial state', () => {
    it('should return the initial state', () => {
      const action = { type: 'UNKNOWN' } as any;
      const result = beerReducer(undefined, action);

      expect(result).toEqual(initialState);
    });
  });

  describe('LOAD_BEERS', () => {
    it('should set loaded to false when loading beers', () => {
      const action = new LoadBeers();
      const result = beerReducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.beers).toEqual([]);
    });

    it('should keep existing beers while loading', () => {
      const existingBeers: Beer[] = [
        {
          sku: '123',
          name: 'IPA',
          brewery: 'Brewery 1',
          abv: '5.5',
          ibu: '40',
          country: 'USA',
        },
      ];
      const currentState: BeerState = {
        beers: existingBeers,
        loaded: true,
      };
      const action = new LoadBeers();
      const result = beerReducer(currentState, action);

      expect(result.loaded).toBe(false);
      expect(result.beers).toEqual(existingBeers);
    });
  });

  describe('LOAD_BEERS_SUCCESS', () => {
    it('should load beers successfully', () => {
      const beers: Beer[] = [
        {
          sku: '123',
          name: 'IPA',
          brewery: 'Brewery 1',
          abv: '5.5',
          ibu: '40',
          country: 'USA',
        },
        {
          sku: '456',
          name: 'Stout',
          brewery: 'Brewery 2',
          abv: '6.0',
          ibu: '50',
          country: 'Ireland',
        },
      ];
      const action = new LoadBeersSuccess(beers);
      const result = beerReducer(initialState, action);

      expect(result.beers).toEqual(beers);
      expect(result.loaded).toBe(true);
    });

    it('should replace existing beers', () => {
      const existingBeers: Beer[] = [
        {
          sku: '999',
          name: 'Old Beer',
          brewery: 'Old Brewery',
          abv: '4.0',
          ibu: '30',
          country: 'Germany',
        },
      ];
      const currentState: BeerState = {
        beers: existingBeers,
        loaded: false,
      };
      const newBeers: Beer[] = [
        {
          sku: '123',
          name: 'New IPA',
          brewery: 'New Brewery',
          abv: '5.5',
          ibu: '40',
          country: 'USA',
        },
      ];
      const action = new LoadBeersSuccess(newBeers);
      const result = beerReducer(currentState, action);

      expect(result.beers).toEqual(newBeers);
      expect(result.beers).not.toEqual(existingBeers);
      expect(result.loaded).toBe(true);
    });
  });

  describe('LOAD_BEERS_FAILURE', () => {
    it('should set loaded to false on error', () => {
      const currentState: BeerState = {
        beers: [],
        loaded: true,
      };
      const error = { message: 'Error al cargar' };
      const action = new LoadBeersFailure(error);
      const result = beerReducer(currentState, action);

      expect(result.loaded).toBe(false);
      expect(result.beers).toEqual([]);
    });
  });

  describe('ADD_BEER', () => {
    it('should add a new beer to empty state', () => {
      const newBeer: Beer = {
        sku: '123',
        name: 'IPA',
        brewery: 'Brewery 1',
        abv: '5.5',
        ibu: '40',
        country: 'USA',
      };
      const action = new AddBeer(newBeer);
      const result = beerReducer(initialState, action);

      expect(result.beers.length).toBe(1);
      expect(result.beers[0]).toEqual(newBeer);
    });

    it('should add a new beer to existing state', () => {
      const existingBeer: Beer = {
        sku: '456',
        name: 'Stout',
        brewery: 'Brewery 2',
        abv: '6.0',
        ibu: '50',
        country: 'Ireland',
      };
      const currentState: BeerState = {
        beers: [existingBeer],
        loaded: true,
      };
      const newBeer: Beer = {
        sku: '789',
        name: 'Lager',
        brewery: 'Brewery 3',
        abv: '4.5',
        ibu: '35',
        country: 'Germany',
      };
      const action = new AddBeer(newBeer);
      const result = beerReducer(currentState, action);

      expect(result.beers.length).toBe(2);
      expect(result.beers[0]).toEqual(existingBeer);
      expect(result.beers[1]).toEqual(newBeer);
    });

    it('should not modify the original state (immutability)', () => {
      const currentState: BeerState = {
        beers: [],
        loaded: true,
      };
      const newBeer: Beer = {
        sku: '123',
        name: 'IPA',
        brewery: 'Brewery 1',
        abv: '5.5',
        ibu: '40',
        country: 'USA',
      };
      const action = new AddBeer(newBeer);
      const result = beerReducer(currentState, action);

      expect(result).not.toBe(currentState);
      expect(result.beers).not.toBe(currentState.beers);
    });
  });

  describe('DELETE_BEER', () => {
    it('should delete a beer by sku', () => {
      const beer1: Beer = {
        sku: '123',
        name: 'IPA',
        brewery: 'Brewery 1',
        abv: '5.5',
        ibu: '40',
        country: 'USA',
      };
      const beer2: Beer = {
        sku: '456',
        name: 'Stout',
        brewery: 'Brewery 2',
        abv: '6.0',
        ibu: '50',
        country: 'Ireland',
      };
      const currentState: BeerState = {
        beers: [beer1, beer2],
        loaded: true,
      };
      const action = new DeleteBeer('123');
      const result = beerReducer(currentState, action);

      expect(result.beers.length).toBe(1);
      expect(result.beers[0]).toEqual(beer2);
      expect(result.beers.find(b => b.sku === '123')).toBeUndefined();
    });

    it('should keep the state if sku does not exist', () => {
      const beer: Beer = {
        sku: '123',
        name: 'IPA',
        brewery: 'Brewery 1',
        abv: '5.5',
        ibu: '40',
        country: 'USA',
      };
      const currentState: BeerState = {
        beers: [beer],
        loaded: true,
      };
      const action = new DeleteBeer('999');
      const result = beerReducer(currentState, action);

      expect(result.beers.length).toBe(1);
      expect(result.beers[0]).toEqual(beer);
    });

    it('should not modify the original state (immutability)', () => {
      const beer: Beer = {
        sku: '123',
        name: 'IPA',
        brewery: 'Brewery 1',
        abv: '5.5',
        ibu: '40',
        country: 'USA',
      };
      const currentState: BeerState = {
        beers: [beer],
        loaded: true,
      };
      const action = new DeleteBeer('123');
      const result = beerReducer(currentState, action);

      expect(result).not.toBe(currentState);
      expect(result.beers).not.toBe(currentState.beers);
    });
  });

  describe('UPDATE_BEER', () => {
    it('should update an existing beer', () => {
      const originalBeer: Beer = {
        sku: '123',
        name: 'IPA',
        brewery: 'Brewery 1',
        abv: '5.5',
        ibu: '40',
        country: 'USA',
      };
      const currentState: BeerState = {
        beers: [originalBeer],
        loaded: true,
      };
      const updatedBeer: Beer = {
        sku: '123',
        name: 'Updated IPA',
        brewery: 'Updated Brewery',
        abv: '6.0',
        ibu: '45',
        country: 'USA',
      };
      const action = new UpdateBeer(updatedBeer);
      const result = beerReducer(currentState, action);

      expect(result.beers.length).toBe(1);
      expect(result.beers[0]).toEqual(updatedBeer);
      expect(result.beers[0].name).toBe('Updated IPA');
      expect(result.beers[0].abv).toBe('6.0');
    });

    it('should update only the correct beer in a list', () => {
      const beer1: Beer = {
        sku: '123',
        name: 'IPA',
        brewery: 'Brewery 1',
        abv: '5.5',
        ibu: '40',
        country: 'USA',
      };
      const beer2: Beer = {
        sku: '456',
        name: 'Stout',
        brewery: 'Brewery 2',
        abv: '6.0',
        ibu: '50',
        country: 'Ireland',
      };
      const beer3: Beer = {
        sku: '789',
        name: 'Lager',
        brewery: 'Brewery 3',
        abv: '4.5',
        ibu: '35',
        country: 'Germany',
      };
      const currentState: BeerState = {
        beers: [beer1, beer2, beer3],
        loaded: true,
      };
      const updatedBeer: Beer = {
        ...beer2,
        name: 'Updated Stout',
        abv: '7.0',
      };
      const action = new UpdateBeer(updatedBeer);
      const result = beerReducer(currentState, action);

      expect(result.beers.length).toBe(3);
      expect(result.beers[0]).toEqual(beer1);
      expect(result.beers[1]).toEqual(updatedBeer);
      expect(result.beers[2]).toEqual(beer3);
    });

    it('should keep the state if sku does not exist', () => {
      const beer: Beer = {
        sku: '123',
        name: 'IPA',
        brewery: 'Brewery 1',
        abv: '5.5',
        ibu: '40',
        country: 'USA',
      };
      const currentState: BeerState = {
        beers: [beer],
        loaded: true,
      };
      const updatedBeer: Beer = {
        sku: '999',
        name: 'Non-existent Beer',
        brewery: 'Unknown',
        abv: '0',
        ibu: '0',
        country: 'Unknown',
      };
      const action = new UpdateBeer(updatedBeer);
      const result = beerReducer(currentState, action);

      expect(result.beers.length).toBe(1);
      expect(result.beers[0]).toEqual(beer);
    });

    it('should not modify the original state (immutability)', () => {
      const beer: Beer = {
        sku: '123',
        name: 'IPA',
        brewery: 'Brewery 1',
        abv: '5.5',
        ibu: '40',
        country: 'USA',
      };
      const currentState: BeerState = {
        beers: [beer],
        loaded: true,
      };
      const updatedBeer: Beer = {
        ...beer,
        name: 'Updated IPA',
      };
      const action = new UpdateBeer(updatedBeer);
      const result = beerReducer(currentState, action);

      expect(result).not.toBe(currentState);
      expect(result.beers).not.toBe(currentState.beers);
    });
  });
});
