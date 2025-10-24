import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import { selectIsLoading } from './store/ui.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Mi App de Cervezas v5';
  isLoading$: Observable<boolean>;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(selectIsLoading);
  }
}
