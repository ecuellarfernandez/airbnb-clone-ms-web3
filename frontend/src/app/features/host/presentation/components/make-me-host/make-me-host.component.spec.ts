import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeMeHostComponent } from './make-me-host.component';

describe('MakeMeHostComponent', () => {
  let component: MakeMeHostComponent;
  let fixture: ComponentFixture<MakeMeHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MakeMeHostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakeMeHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
