import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { selectIsLoading } from './store/ui.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Mi App de Cervezas v5';
  isLoading$: Observable<boolean>;

  constructor(private store: Store<any>) {
    this.isLoading$ = this.store.select(selectIsLoading);
  }
}
