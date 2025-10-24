import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Beer } from '../../../core/models/beer.model';

@Component({
  selector: 'mh-beer-delete-dialog',
  templateUrl: './beer-delete-dialog.component.html',
  styleUrls: ['./beer-delete-dialog.component.css'],
})
export class BeerDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<BeerDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Beer
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
