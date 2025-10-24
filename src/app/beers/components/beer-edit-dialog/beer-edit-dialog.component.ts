import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Beer } from '../../../core/models/beer.model';

@Component({
  selector: 'mh-beer-edit-dialog',
  templateUrl: './beer-edit-dialog.component.html',
  styleUrls: ['./beer-edit-dialog.component.css'],
})
export class BeerEditDialogComponent implements OnInit {
  beerForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BeerEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Beer
  ) {}

  ngOnInit(): void {
    this.beerForm = this.fb.group({
      sku: [
        { value: this.data.sku, disabled: true },
        [Validators.required, Validators.minLength(3)],
      ],
      name: [this.data.name, [Validators.required, Validators.minLength(3)]],
      brewery: [
        this.data.brewery,
        [Validators.required, Validators.minLength(3)],
      ],
      abv: [parseFloat(this.data.abv) || 0, [Validators.required]],
      ibu: [parseFloat(this.data.ibu) || 0, [Validators.required]],
      country: [
        this.data.country || '',
        [Validators.required, Validators.minLength(3)],
      ],
    });
  }

  get f() {
    return this.beerForm.controls;
  }

  onAbvChange(value: number): void {
    this.beerForm.patchValue({ abv: value });
  }

  onIbuChange(value: number): void {
    this.beerForm.patchValue({ ibu: value });
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
