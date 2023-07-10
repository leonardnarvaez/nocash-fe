import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  requestPasswordResetForm: FormGroup;
  pinResetForm: FormGroup;
  verificationCodeForm: FormGroup;
  currentPage: string;
  reactivationRequestUrl = environment.API_HOST + '/authentication/request-account-reactivation';
  reactivationUrl = environment.API_HOST + '/authentication/reactivate-account';
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private http: HttpClient
  ){
    this.requestPasswordResetForm = formBuilder.group(
      {
        email: ['', [Validators.email, Validators.required]]  
      }
    )
    this.pinResetForm = formBuilder.group(
      {
        newPin: ['', [Validators.required, Validators.min(4)]],
        confirmPin: ['', [Validators.required, Validators.min(4)]]
      }
    )
    this.verificationCodeForm = formBuilder.group(
      {
        code: ['', Validators.required]
      }
    )
    this.currentPage = "main";
  }
  
  get rpr() {
    return this.requestPasswordResetForm.controls;
  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()) {
      this.router.navigateByUrl("/app/home");
    }
  }


  requestPasswordReset(): void {
    this.http.post<any>(this.reactivationRequestUrl, this.requestPasswordResetForm.value)
    .pipe(catchError(this.handleError))
    .subscribe(response => {
      alert(response);
      console.info(response);
      this.currentPage = 'code-form';
    });
  }

  showPinResetForm(): void {
    this.currentPage = 'pin-reset-form';
  }

  resetPin(): void {
    const email = this.requestPasswordResetForm.value['email'];
    const code = this.verificationCodeForm.value['code'];
    const newPIN = this.pinResetForm.value['newPin'];
    console.log({email, code, newPIN});
    this.http.post<any>(this.reactivationUrl, {email, code, newPIN})
    .pipe(catchError(this.handleError))
    .subscribe(response => {
      alert(response);
      console.info(response);
      this.currentPage = 'success-page';
    });
  }

  goBack(): void {
    if(this.currentPage === 'main') {
      this.location.back();
    } else if(this.currentPage === 'code-form') {
      this.currentPage = 'main'
    } else if(this.currentPage === 'pin-reset-form') {
      this.currentPage = 'code-form';
    }
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
    // to prevent a bug where if the logout request failed 
    // this.stateService.removeCurrentUser();
    return throwError(() => new Error('HAHAHAHAHA'))
  }
}
