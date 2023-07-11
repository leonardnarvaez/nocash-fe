import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashInFormComponent } from './cash-in-form.component';

describe('CashInFormComponent', () => {
  let component: CashInFormComponent;
  let fixture: ComponentFixture<CashInFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CashInFormComponent]
    });
    fixture = TestBed.createComponent(CashInFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
