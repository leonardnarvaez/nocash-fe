import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QRPageComponent } from './qrpage.component';

describe('QRPageComponent', () => {
  let component: QRPageComponent;
  let fixture: ComponentFixture<QRPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QRPageComponent]
    });
    fixture = TestBed.createComponent(QRPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
