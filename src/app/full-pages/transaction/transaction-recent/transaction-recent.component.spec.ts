import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionRecentComponent } from './transaction-recent.component';

describe('TransactionRecentComponent', () => {
  let component: TransactionRecentComponent;
  let fixture: ComponentFixture<TransactionRecentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionRecentComponent]
    });
    fixture = TestBed.createComponent(TransactionRecentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
