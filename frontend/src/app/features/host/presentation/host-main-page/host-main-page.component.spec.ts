import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostMainPageComponent } from './host-main-page.component';

describe('HostMainPageComponent', () => {
  let component: HostMainPageComponent;
  let fixture: ComponentFixture<HostMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostMainPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
