import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';

import { Beer } from '../models/beer.model';
import { BeerAddDialogComponent } from '../../beers/components/beer-add-dialog/beer-add-dialog.component';
import { BeerEditDialogComponent } from '../../beers/components/beer-edit-dialog/beer-edit-dialog.component';
import { BeerDeleteDialogComponent } from '../../beers/components/beer-delete-dialog/beer-delete-dialog.component';

@Injectable()
export class DialogService {
  private readonly defaultDialogConfig = {
    width: '500px',
    maxWidth: '95vw',
  };

  constructor(private dialog: MatDialog) {}

  openAddBeerDialog(): Observable<Partial<Beer>> {
    const dialogRef = this.dialog.open(
      BeerAddDialogComponent,
      this.defaultDialogConfig
    );

    return dialogRef.afterClosed().filter(result => !!result);
  }

  openEditBeerDialog(beer: Beer): Observable<Beer> {
    const dialogRef = this.dialog.open(BeerEditDialogComponent, {
      ...this.defaultDialogConfig,
      data: beer,
    });

    return dialogRef.afterClosed().filter(result => !!result);
  }

  openDeleteBeerDialog(beer: Beer): Observable<boolean> {
    const dialogRef = this.dialog.open(BeerDeleteDialogComponent, {
      ...this.defaultDialogConfig,
      data: beer,
    });

    return dialogRef.afterClosed().filter(result => !!result);
  }
}

