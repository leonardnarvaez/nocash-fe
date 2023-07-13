import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailDialogComponent } from './fail-dialog.component';

describe('FailDialogComponent', () => {
  let component: FailDialogComponent;
  let fixture: ComponentFixture<FailDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FailDialogComponent]
    });
    fixture = TestBed.createComponent(FailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
