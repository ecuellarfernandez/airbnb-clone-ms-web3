import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingBookingsComponent } from './listing-bookings.component';

describe('ListingBookingsComponent', () => {
  let component: ListingBookingsComponent;
  let fixture: ComponentFixture<ListingBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListingBookingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
