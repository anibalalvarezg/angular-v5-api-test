import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { BeerListComponent } from './components/beer-list/beer-list.component';
import { BeerAddDialogComponent } from './components/beer-add-dialog/beer-add-dialog.component';
import { BeerEditDialogComponent } from './components/beer-edit-dialog/beer-edit-dialog.component';
import { BeerDeleteDialogComponent } from './components/beer-delete-dialog/beer-delete-dialog.component';
import { BeerTableComponent } from './components/beer-table/beer-table.component';
import { BeerCardsComponent } from './components/beer-cards/beer-cards.component';
import { BeerFormComponent } from './components/beer-form/beer-form.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  declarations: [
    BeerListComponent,
    BeerAddDialogComponent,
    BeerEditDialogComponent,
    BeerDeleteDialogComponent,
    BeerTableComponent,
    BeerCardsComponent,
    BeerFormComponent,
  ],
  exports: [BeerListComponent],
  entryComponents: [
    BeerAddDialogComponent,
    BeerEditDialogComponent,
    BeerDeleteDialogComponent,
  ],
})
export class BeersModule {}
