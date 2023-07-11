import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashOutComponent } from './cash-out.component';

describe('CashOutComponent', () => {
  let component: CashOutComponent;
  let fixture: ComponentFixture<CashOutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CashOutComponent]
    });
    fixture = TestBed.createComponent(CashOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
