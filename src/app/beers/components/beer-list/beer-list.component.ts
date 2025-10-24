import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import 'rxjs/add/operator/take';

import { Beer } from '../../../core/models/beer.model';
import { BeerState } from '../../../store/beers.state';
import { selectAllBeers } from '../../../store/beers.selectors';
import { DeleteBeer } from '../../../store/beers.actions';

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.css'],
})
export class BeerListComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Beer>;
  displayedColumns: string[] = [
    'sku',
    'name',
    'brewery',
    'abv',
    'ibu',
    'country',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private store: Store<BeerState>) {
    this.dataSource = new MatTableDataSource<Beer>([]);
  }

  ngOnInit() {
    this.store.select(selectAllBeers).subscribe(beers => {
      this.dataSource.data = beers;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  addBeer() {
    alert('Agregar nueva cerveza');
  }

  deleteBeer(sku: string) {
    if (confirm('¿Estás seguro de que deseas eliminar esta cerveza?')) {
      this.store.dispatch(new DeleteBeer(sku));
    }
  }

  editBeer(beer: Beer) {
    alert('Editar cerveza: ' + beer.name);
  }
}
