import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UiState } from './ui.state';

export const selectUiState = createFeatureSelector<UiState>('ui');

export const selectIsLoading = createSelector(
  selectUiState,
  (state: UiState) => state.isLoading
);

export const selectLoadingMessage = createSelector(
  selectUiState,
  (state: UiState) => state.loadingMessage
);
