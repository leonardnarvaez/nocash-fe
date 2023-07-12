import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessBoxComponent } from './success-box.component';

describe('SuccessBoxComponent', () => {
  let component: SuccessBoxComponent;
  let fixture: ComponentFixture<SuccessBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessBoxComponent]
    });
    fixture = TestBed.createComponent(SuccessBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
