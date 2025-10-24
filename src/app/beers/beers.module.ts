import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module'; // Para MatTable

import { BeerListComponent } from './components/beer-list/beer-list.component';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [BeerListComponent],
  exports: [BeerListComponent],
})
export class BeersModule {}
