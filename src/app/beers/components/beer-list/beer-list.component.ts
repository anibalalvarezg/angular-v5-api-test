import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import 'rxjs/add/operator/take';

import { Beer } from '../../../core/models/beer.model';
import { BeerState } from '../../../store/beers.state';
import { selectAllBeers } from '../../../store/beers.selectors';
import { AddBeer, DeleteBeer, UpdateBeer } from '../../../store/beers.actions';
import { BeerAddDialogComponent } from '../beer-add-dialog/beer-add-dialog.component';
import { BeerEditDialogComponent } from '../beer-edit-dialog/beer-edit-dialog.component';
import { BeerDeleteDialogComponent } from '../beer-delete-dialog/beer-delete-dialog.component';

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.css'],
})
export class BeerListComponent implements OnInit {
  allBeers: Beer[] = [];

  constructor(
    private store: Store<BeerState>,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.store.select(selectAllBeers).subscribe(beers => {
      this.allBeers = beers;
    });
  }

  addBeer() {
    const dialogRef = this.dialog.open(BeerAddDialogComponent, {
      width: '500px',
      maxWidth: '95vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newBeer: Beer = {
          ...result,
          rating: '',
          category: '',
          sub_category_1: '',
          sub_category_2: '',
          sub_category_3: '',
          description: '',
          region: '',
          calories_per_serving_12oz: '',
          carbs_per_serving_12oz: '',
          tasting_notes: '',
          food_pairing: '',
          suggested_glassware: '',
          serving_temp_f: '',
          serving_temp_c: '',
          beer_type: '',
          features: '',
        };
        this.store.dispatch(new AddBeer(newBeer));
        this.snackBar.open('Cerveza agregada exitosamente', 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }

  deleteBeer(sku: string) {
    this.store
      .select(selectAllBeers)
      .take(1)
      .subscribe(beers => {
        const beer = beers.find(b => b.sku === sku);
        if (beer) {
          const dialogRef = this.dialog.open(BeerDeleteDialogComponent, {
            width: '500px',
            maxWidth: '95vw',
            data: beer,
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.store.dispatch(new DeleteBeer(sku));
              this.snackBar.open('Cerveza eliminada exitosamente', 'Cerrar', {
                duration: 3000,
              });
            }
          });
        }
      });
  }

  editBeer(beer: Beer) {
    const dialogRef = this.dialog.open(BeerEditDialogComponent, {
      width: '500px',
      maxWidth: '95vw',
      data: beer,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new UpdateBeer(result));
        this.snackBar.open('Cerveza actualizada exitosamente', 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }
}
