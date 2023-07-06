import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationHistoryCardComponent } from './authentication-history-card.component';

describe('AuthenticationHistoryCardComponent', () => {
  let component: AuthenticationHistoryCardComponent;
  let fixture: ComponentFixture<AuthenticationHistoryCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthenticationHistoryCardComponent]
    });
    fixture = TestBed.createComponent(AuthenticationHistoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
