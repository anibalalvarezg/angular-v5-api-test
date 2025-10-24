export interface UiState {
  isLoading: boolean;
  loadingMessage: string;
}

export const initialUiState: UiState = {
  isLoading: true,
  loadingMessage: 'Cargando datos...',
};
