import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsHomeComponent } from './transactions-home.component';

describe('TransactionsHomeComponent', () => {
  let component: TransactionsHomeComponent;
  let fixture: ComponentFixture<TransactionsHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionsHomeComponent]
    });
    fixture = TestBed.createComponent(TransactionsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
