import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { localStorageSync } from 'ngrx-store-localstorage';
import { beerReducer } from './store/beers.reducer';

import { BeerDataService } from './core/services/beer-data.service';
import { MaterialModule } from './material/material.module';
import { uiReducer } from './store/ui.reducer';
import { SharedModule } from './shared/shared.module';
import { BeersModule } from './beers/beers.module';
import { BeersEffects } from './store/beers.effects';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: ['beers'],
    rehydrate: true,
  })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    BeersModule,
    StoreModule.forRoot(
      { beers: beerReducer, ui: uiReducer },
      { metaReducers }
    ),
    EffectsModule.forRoot([BeersEffects]),
  ],
  providers: [BeerDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
