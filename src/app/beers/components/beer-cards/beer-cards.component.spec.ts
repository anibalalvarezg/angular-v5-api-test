import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerCardsComponent } from './beer-cards.component';

describe('BeerCardsComponent', () => {
  let component: BeerCardsComponent;
  let fixture: ComponentFixture<BeerCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeerCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
