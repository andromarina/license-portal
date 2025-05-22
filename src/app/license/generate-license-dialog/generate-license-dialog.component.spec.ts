import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateLicenseDialogComponent } from './generate-license-dialog.component';

describe('GenerateLicenseDialogComponent', () => {
  let component: GenerateLicenseDialogComponent;
  let fixture: ComponentFixture<GenerateLicenseDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateLicenseDialogComponent]
    });
    fixture = TestBed.createComponent(GenerateLicenseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
