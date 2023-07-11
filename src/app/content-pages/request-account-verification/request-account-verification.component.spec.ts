import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAccountVerificationComponent } from './request-account-verification.component';

describe('RequestAccountVerificationComponent', () => {
  let component: RequestAccountVerificationComponent;
  let fixture: ComponentFixture<RequestAccountVerificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestAccountVerificationComponent]
    });
    fixture = TestBed.createComponent(RequestAccountVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
