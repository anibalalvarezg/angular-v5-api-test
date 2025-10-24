import { UiActions, START_LOADING, STOP_LOADING } from './ui.actions';
import { UiState, initialUiState } from './ui.state';

export function uiReducer(state = initialUiState, action: UiActions): UiState {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
        loadingMessage: action.payload || 'Procesando...',
      };
    case STOP_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
