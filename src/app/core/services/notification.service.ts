import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable()
export class NotificationService {
  private readonly defaultConfig: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
  };

  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string, action: string = 'Cerrar'): void {
    this.snackBar.open(message, action, this.defaultConfig);
  }

  showError(message: string, action: string = 'Cerrar'): void {
    this.snackBar.open(message, action, {
      ...this.defaultConfig,
      duration: 5000,
    });
  }

  showInfo(message: string, action: string = 'Cerrar'): void {
    this.snackBar.open(message, action, this.defaultConfig);
  }

  beerAdded(): void {
    this.showSuccess('Cerveza agregada exitosamente');
  }

  beerUpdated(): void {
    this.showSuccess('Cerveza actualizada exitosamente');
  }

  beerDeleted(): void {
    this.showSuccess('Cerveza eliminada exitosamente');
  }
}

