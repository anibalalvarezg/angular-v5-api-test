import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Beer } from '../../../core/models/beer.model';

@Component({
  selector: 'mh-beer-add-dialog',
  templateUrl: './beer-add-dialog.component.html',
  styleUrls: ['./beer-add-dialog.component.css'],
})
export class BeerAddDialogComponent implements OnInit {
  beerForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BeerAddDialogComponent>
  ) {}

  ngOnInit(): void {
    this.beerForm = this.fb.group({
      sku: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      brewery: ['', [Validators.required, Validators.minLength(3)]],
      abv: [0, [Validators.required]],
      ibu: [0, [Validators.required]],
      country: ['', [Validators.required, Validators.minLength(3)]],
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

    const beer: Partial<Beer> = {
      ...this.beerForm.value,
      abv: parseFloat(this.beerForm.value.abv).toFixed(1) + '%',
      ibu: Math.round(this.beerForm.value.ibu).toString(),
    };

    this.dialogRef.close(beer);
  }
}
