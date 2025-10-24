import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Beer } from '../../../core/models/beer.model';

@Component({
  selector: 'mh-beer-add-dialog',
  templateUrl: './beer-add-dialog.component.html',
  styleUrls: ['./beer-add-dialog.component.css'],
})
export class BeerAddDialogComponent {
  beerForm: FormGroup;
  submitted = false;

  constructor(public dialogRef: MatDialogRef<BeerAddDialogComponent>) {}

  onFormChange(form: FormGroup): void {
    this.beerForm = form;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.submitted = true;

    if (this.beerForm.invalid) {
      return;
    }

    const beer: Partial<Beer> = {
      ...this.beerForm.value,
      abv: parseFloat(this.beerForm.value.abv).toFixed(1) + '%',
      ibu: Math.round(this.beerForm.value.ibu).toString(),
    };

    this.dialogRef.close(beer);
  }
}
