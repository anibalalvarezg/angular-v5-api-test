import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Beer } from '../../../core/models/beer.model';

@Component({
  selector: 'mh-beer-cards',
  templateUrl: './beer-cards.component.html',
  styleUrls: ['./beer-cards.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeerCardsComponent implements AfterViewInit {
  @Input() beers: Beer[] = [];
  @Output() edit = new EventEmitter<Beer>();
  @Output() delete = new EventEmitter<string>();

  paginatedBeers: Beer[] = [];
  pageSize = 5;
  pageIndex = 0;

  @ViewChild('cardPaginator') paginator: MatPaginator;

  ngOnChanges() {
    this.updatePaginatedBeers();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.paginator.page.subscribe(() => {
        this.pageIndex = this.paginator.pageIndex;
        this.pageSize = this.paginator.pageSize;
        this.updatePaginatedBeers();
      });
    }
  }

  updatePaginatedBeers() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedBeers = this.beers.slice(startIndex, endIndex);

    if (window.innerWidth < 768) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  onEdit(beer: Beer) {
    this.edit.emit(beer);
  }

  onDelete(sku: string) {
    this.delete.emit(sku);
  }
}
