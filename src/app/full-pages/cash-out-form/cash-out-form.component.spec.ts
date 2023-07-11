import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashOutFormComponent } from './cash-out-form.component';

describe('CashOutFormComponent', () => {
  let component: CashOutFormComponent;
  let fixture: ComponentFixture<CashOutFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CashOutFormComponent]
    });
    fixture = TestBed.createComponent(CashOutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
