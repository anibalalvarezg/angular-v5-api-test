import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import { Beer } from '../../../core/models/beer.model';
import { DialogService } from '../../../core/services/dialog.service';
import { BeerFacadeService } from '../../../core/services/beer-facade.service';

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.css'],
})
export class BeerListComponent implements OnInit {
  allBeers$: Observable<Beer[]>;

  constructor(
    private dialogService: DialogService,
    private beerFacade: BeerFacadeService
  ) {}

  ngOnInit() {
    this.allBeers$ = this.beerFacade.beers$;
  }

  addBeer() {
    this.dialogService
      .openAddBeerDialog()
      .subscribe(beerData => this.beerFacade.addBeer(beerData));
  }

  deleteBeer(sku: string) {
    this.beerFacade.beers$.take(1).subscribe(beers => {
      const beer = beers.find(b => b.sku === sku);
      if (beer) {
        this.dialogService
          .openDeleteBeerDialog(beer)
          .subscribe(() => this.beerFacade.deleteBeer(sku));
      }
    });
  }

  editBeer(beer: Beer) {
    this.dialogService
      .openEditBeerDialog(beer)
      .subscribe(updatedBeer => this.beerFacade.updateBeer(updatedBeer));
  }
}
