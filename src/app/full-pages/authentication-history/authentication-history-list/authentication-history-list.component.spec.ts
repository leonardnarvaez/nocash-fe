import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationHistoryListComponent } from './authentication-history-list.component';

describe('AuthenticationHistoryListComponent', () => {
  let component: AuthenticationHistoryListComponent;
  let fixture: ComponentFixture<AuthenticationHistoryListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthenticationHistoryListComponent]
    });
    fixture = TestBed.createComponent(AuthenticationHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
