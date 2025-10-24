import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { selectIsLoading, selectLoadingMessage } from './store/ui.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Mi App de Cervezas v5';
  isLoading$: Observable<boolean>;
  loadingMessage$: Observable<string>;

  constructor(private store: Store<any>) {
    this.isLoading$ = this.store.select(selectIsLoading);
    this.loadingMessage$ = this.store.select(selectLoadingMessage);
  }
}
