import { BeerActions, LOAD_BEERS_SUCCESS } from './beers.actions';
import { BeerState, initialState } from './beers.state';

export function beerReducer(
  state = initialState,
  action: BeerActions
): BeerState {
  switch (action.type) {
    case LOAD_BEERS_SUCCESS:
      return {
        ...state,
        beers: action.payload,
        loaded: true,
      };

    default:
      return state;
  }
}
