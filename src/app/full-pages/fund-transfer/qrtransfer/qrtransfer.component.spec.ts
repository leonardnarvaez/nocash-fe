import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QRTransferComponent } from './qrtransfer.component';

describe('QRTransferComponent', () => {
  let component: QRTransferComponent;
  let fixture: ComponentFixture<QRTransferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QRTransferComponent]
    });
    fixture = TestBed.createComponent(QRTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
