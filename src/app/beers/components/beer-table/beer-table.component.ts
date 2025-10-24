import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Beer } from '../../../core/models/beer.model';

@Component({
  selector: 'mh-beer-table',
  templateUrl: './beer-table.component.html',
  styleUrls: ['./beer-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeerTableComponent implements AfterViewInit {
  @Input() beers: Beer[] = [];
  @Output() edit = new EventEmitter<Beer>();
  @Output() delete = new EventEmitter<string>();

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

  @ViewChild('tablePaginator') paginator: MatPaginator;

  constructor() {
    this.dataSource = new MatTableDataSource<Beer>([]);
  }

  ngOnChanges() {
    this.dataSource.data = this.beers;
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  onEdit(beer: Beer) {
    this.edit.emit(beer);
  }

  onDelete(sku: string) {
    this.delete.emit(sku);
  }
}
