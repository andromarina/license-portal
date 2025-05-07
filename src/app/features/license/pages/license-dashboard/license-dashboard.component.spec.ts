import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseDashboardComponent } from './license-dashboard.component';

describe('LicenseDashboardComponent', () => {
  let component: LicenseDashboardComponent;
  let fixture: ComponentFixture<LicenseDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LicenseDashboardComponent]
    });
    fixture = TestBed.createComponent(LicenseDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
