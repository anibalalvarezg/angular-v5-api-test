import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { Beer } from '../models/beer.model';
import { BeerState } from '../../store/beers.state';
import { selectAllBeers } from '../../store/beers.selectors';
import { AddBeer, DeleteBeer, UpdateBeer } from '../../store/beers.actions';
import { StartLoading, StopLoading } from '../../store/ui.actions';
import { NotificationService } from './notification.service';

@Injectable()
export class BeerFacadeService {
  beers$: Observable<Beer[]>;

  constructor(
    private store: Store<BeerState>,
    private notificationService: NotificationService
  ) {
    this.beers$ = this.store.select(selectAllBeers);
  }

  addBeer(beerData: Partial<Beer>): void {
    this.store.dispatch(new StartLoading('Agregando cerveza...'));

    setTimeout(() => {
      const newBeer: Beer = {
        sku: beerData.sku,
        name: beerData.name,
        brewery: beerData.brewery,
        abv: beerData.abv.toString(),
        ibu: beerData.ibu.toString(),
        country: beerData.country,
      };

      this.store.dispatch(new AddBeer(newBeer));
      this.store.dispatch(new StopLoading());
      this.notificationService.beerAdded();
    }, 1000);
  }

  updateBeer(beer: Beer): void {
    this.store.dispatch(new StartLoading('Actualizando cerveza...'));

    setTimeout(() => {
      this.store.dispatch(new UpdateBeer(beer));
      this.store.dispatch(new StopLoading());
      this.notificationService.beerUpdated();
    }, 1000);
  }

  deleteBeer(sku: string): void {
    this.store.dispatch(new StartLoading('Eliminando cerveza...'));

    setTimeout(() => {
      this.store.dispatch(new DeleteBeer(sku));
      this.store.dispatch(new StopLoading());
      this.notificationService.beerDeleted();
    }, 1000);
  }
}

