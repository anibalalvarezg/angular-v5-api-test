import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Beer } from '../../../core/models/beer.model';

@Component({
  selector: 'mh-beer-form',
  templateUrl: './beer-form.component.html',
  styleUrls: ['./beer-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeerFormComponent implements OnInit {
  @Input() beer: Partial<Beer> | null = null;
  @Input() disableSku = false;
  @Input() submitted = false;
  @Output() formChange = new EventEmitter<FormGroup>();

  beerForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.beerForm = this.fb.group({
      sku: [
        {
          value: (this.beer && this.beer.sku) || '',
          disabled: this.disableSku,
        },
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[0-9]+$/),
        ],
      ],
      name: [
        (this.beer && this.beer.name) || '',
        [Validators.required, Validators.minLength(3)],
      ],
      brewery: [
        (this.beer && this.beer.brewery) || '',
        [Validators.required, Validators.minLength(3)],
      ],
      abv: [
        parseFloat((this.beer && this.beer.abv) || '0') || 0,
        [Validators.required],
      ],
      ibu: [
        parseFloat((this.beer && this.beer.ibu) || '0') || 0,
        [Validators.required],
      ],
      country: [
        (this.beer && this.beer.country) || '',
        [Validators.required, Validators.minLength(3)],
      ],
    });

    this.formChange.emit(this.beerForm);
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
}
