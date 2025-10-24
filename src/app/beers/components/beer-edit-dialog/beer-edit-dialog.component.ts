import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Beer } from '../../../core/models/beer.model';

@Component({
  selector: 'mh-beer-edit-dialog',
  templateUrl: './beer-edit-dialog.component.html',
  styleUrls: ['./beer-edit-dialog.component.css'],
})
export class BeerEditDialogComponent {
  beerForm: FormGroup;
  submitted = false;

  constructor(
    public dialogRef: MatDialogRef<BeerEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Beer
  ) {}

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

    const beer: Beer = {
      ...this.data,
      ...this.beerForm.value,
      sku: this.data.sku,
      abv: parseFloat(this.beerForm.value.abv).toFixed(1) + '%',
      ibu: Math.round(this.beerForm.value.ibu).toString(),
    };

    this.dialogRef.close(beer);
  }
}
