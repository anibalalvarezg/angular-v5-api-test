import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/delay';

import { Beer } from '../../../core/models/beer.model';
import { BeerState } from '../../../store/beers.state';
import { selectAllBeers } from '../../../store/beers.selectors';
import { AddBeer, DeleteBeer, UpdateBeer } from '../../../store/beers.actions';
import { StartLoading, StopLoading } from '../../../store/ui.actions';
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
        this.store.dispatch(new StartLoading('Agregando cerveza...'));

        setTimeout(() => {
          const newBeer: Beer = {
            sku: result.sku,
            name: result.name,
            brewery: result.brewery,
            abv: result.abv.toString(),
            ibu: result.ibu.toString(),
            country: result.country,
          };
          this.store.dispatch(new AddBeer(newBeer));
          this.store.dispatch(new StopLoading());
          this.snackBar.open('Cerveza agregada exitosamente', 'Cerrar', {
            duration: 3000,
          });
        }, 1000);
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
              this.store.dispatch(new StartLoading('Eliminando cerveza...'));

              setTimeout(() => {
                this.store.dispatch(new DeleteBeer(sku));
                this.store.dispatch(new StopLoading());
                this.snackBar.open('Cerveza eliminada exitosamente', 'Cerrar', {
                  duration: 3000,
                });
              }, 1000);
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
        this.store.dispatch(new StartLoading('Actualizando cerveza...'));

        setTimeout(() => {
          this.store.dispatch(new UpdateBeer(result));
          this.store.dispatch(new StopLoading());
          this.snackBar.open('Cerveza actualizada exitosamente', 'Cerrar', {
            duration: 3000,
          });
        }, 1000);
      }
    });
  }
}
