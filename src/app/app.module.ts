import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { beerReducer } from './store/beers.reducer';

import { BeerDataService } from './core/services/beer-data.service';
import { MaterialModule } from './material/material.module';
import { uiReducer } from './store/ui.reducer';
import { SharedModule } from './shared/shared.module';
import { BeersModule } from './beers/beers.module';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: ['beers'],
    rehydrate: true,
  })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

export function initializeAppFactory(
  beerService: BeerDataService
): () => Promise<any> {
  return () => beerService.load();
}

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
  ],
  providers: [
    BeerDataService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [BeerDataService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
