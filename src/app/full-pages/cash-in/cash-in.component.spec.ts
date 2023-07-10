import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashInComponent } from './cash-in.component';

describe('CashInComponent', () => {
  let component: CashInComponent;
  let fixture: ComponentFixture<CashInComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CashInComponent]
    });
    fixture = TestBed.createComponent(CashInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
