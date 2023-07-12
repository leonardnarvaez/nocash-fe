import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { environment } from 'src/app/environments/environment';
import { Location } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MustMatch } from './must-match-validator';
@Component({
  selector: 'app-pin-reset',
  templateUrl: './pin-reset.component.html',
  styleUrls: ['./pin-reset.component.css']
})
export class PinResetComponent implements OnInit{
  pinResetForm: FormGroup;
  pinResetURL = environment.API_HOST + '/api/security/pin-reset/';
  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private http: HttpClient,
    private router: Router
  ) {
    this.pinResetForm = formBuilder.group({
      oldPin: ['', [Validators.required, Validators.pattern('[0-9]{4}'), Validators.minLength(4), Validators.maxLength(4)]],
      newPin: ['', [Validators.required, Validators.pattern('[0-9]{4}'), Validators.minLength(4), Validators.maxLength(4)]],
      confirmPin: ['', [Validators.required, Validators.pattern('[0-9]{4}'), Validators.minLength(4), Validators.maxLength(4)]]
    }, { validator: MustMatch("newPin", "confirmPin")});
  }
  ngOnInit(): void {
  }

  resetPin(): void {
    const payload = {
      oldPIN: this.pinResetForm.value.oldPin,
      newPIN: this.pinResetForm.value.newPin
    }
    console.log(payload);
    this.http.post<any>(this.pinResetURL, payload)
    .pipe(catchError(this.handleError))
      .subscribe((response: any) => {
        console.log(response);
        alert(response.message);
        this.router.navigateByUrl('/app/home');
      });
  }

  goBack(): void {
    this.location.back();
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) 
    {
      console.error('An error occurred:', error.error);
    }
    else 
    {
      console.warn(error);
      alert(error.error.message);
    }
    return throwError(() => new Error(''))
  }

  pinEqualsValidator(control: AbstractControl) {
    const newPin: string = control.get('newPin')?.value;
    const confirmPin: string = control.get('confirmPin')?.value;
    
    if (newPin !== confirmPin) {
      return { notEqual: true}
    }
    return null;
  } 
}
