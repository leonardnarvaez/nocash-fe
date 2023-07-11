import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-pin-reset',
  templateUrl: './pin-reset.component.html',
  styleUrls: ['./pin-reset.component.css']
})
export class PinResetComponent {
  pinResetForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.pinResetForm = formBuilder.group({
      oldPin: ['', [Validators.required]],
      newPin: ['', [Validators.required]],
      confirmPin: ['', [Validators.required]]
    });
  }

  updatePin(): void {
    
  }
  
}
