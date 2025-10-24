import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/debounceTime';

import { BeerState } from '../../store/beers.state';
import { selectAllBeers } from '../../store/beers.selectors';
import { Beer } from '../models/beer.model';

export class UniqueSkuValidator {
  static createValidator(store: Store<BeerState>): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return Observable.of(null);
      }

      return store
        .select(selectAllBeers)
        .debounceTime(300)
        .take(1)
        .map((beers: Beer[]) => {
          const skuExists = beers.some(
            beer => beer.sku.toLowerCase() === control.value.toLowerCase()
          );
          return skuExists ? { skuTaken: { value: control.value } } : null;
        });
    };
  }
}
