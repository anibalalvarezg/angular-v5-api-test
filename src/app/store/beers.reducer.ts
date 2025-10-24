import {
  BeerActions,
  LOAD_BEERS_SUCCESS,
  DELETE_BEER,
  UPDATE_BEER,
} from './beers.actions';
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

    case DELETE_BEER:
      return {
        ...state,
        beers: state.beers.filter(beer => beer.sku !== action.payload),
      };

    case UPDATE_BEER:
      return {
        ...state,
        beers: state.beers.map(beer =>
          beer.sku === action.payload.sku ? action.payload : beer
        ),
      };

    default:
      return state;
  }
}
