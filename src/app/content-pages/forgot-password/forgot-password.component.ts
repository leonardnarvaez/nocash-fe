import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { MustMatch } from './must-match-validator';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { catchError, throwError } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FailDialogComponent } from 'src/app/full-pages/fail-dialog/fail-dialog.component';
import { SuccessDialogComponent } from 'src/app/full-pages/success-dialog/success-dialog.component';

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
  isCodeRequestSuccess: boolean = false;
  isReactivationSuccess: boolean = false;
  dialogRef!: MatDialogRef<SuccessDialogComponent,FailDialogComponent>;
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private http: HttpClient,
    private dialog: MatDialog
  ){
    this.requestPasswordResetForm = formBuilder.group(
      {
        email: ['', [Validators.email, Validators.required]]  
      }
    )
    this.pinResetForm = formBuilder.group(
      {
        newPin: ['', [Validators.required, Validators.pattern('[0-9]{4}'), Validators.minLength(4), Validators.maxLength(4)]],
        confirmPin: ['', [Validators.required, Validators.pattern('[0-9]{4}'), Validators.minLength(4), Validators.maxLength(4)]]
      }, { validator: MustMatch("newPin", "confirmPin")}
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
      this.openSuccessDialog(response.message);
      console.info(response);
      this.currentPage = 'code-form';
      this.isCodeRequestSuccess = true;
    });
  }

  showPinResetForm(): void {
    this.currentPage = 'pin-reset-form';
  }

  openSuccessDialog(successMessage: string): void {
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      disableClose: false,
      autoFocus: false,
      data: {
        successMessage: successMessage
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  openFailDialog(errorMessage: string): void {
    const dialogRef = this.dialog.open(FailDialogComponent, {
      disableClose: false,
      autoFocus: false,
      data: {
        errorMessage: errorMessage
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }

  resetPin(): void {
    const email = this.requestPasswordResetForm.value['email'];
    const code = this.verificationCodeForm.value['code'];
    const newPIN = this.pinResetForm.value['newPin'];
    console.log({email, code, newPIN});
    this.http.post<any>(this.reactivationUrl, {email, code, newPIN})
    .pipe(catchError(this.handleError))
    .subscribe(response => {
      this.openSuccessDialog(response.message)
      console.info(response);
      this.currentPage = 'success-page';
      this.isReactivationSuccess = true;
    });
  }

  pinEqualsValidator(control: AbstractControl) {
    const newPin: string = control.get('newPin')?.value;
    const confirmPin: string = control.get('confirmPin')?.value;
    
    if (newPin !== confirmPin) {
      return { notEqual: true}
    }
    return null;
  } 

  goBack(): void {
    if(this.currentPage === 'main') {
      this.location.back();
    } else if(this.currentPage === 'code-form' && !this.isCodeRequestSuccess) {
      this.currentPage = 'main'
    } else if(this.currentPage === 'pin-reset-form') {
      this.currentPage = 'code-form';
    } else if(this.currentPage === 'success-page') {
      this.router.navigateByUrl('/login');
    }
  }

  get isGoBackDisabled() {
    // prevent user from going back the email page
    return this.currentPage === 'code-form' && !this.isCodeRequestSuccess
  }

  private handleError = (error: HttpErrorResponse) => {
    if (error.status === 0) 
    {
      console.error('An error occurred:', error.error);
    }
    else 
    {
      console.warn(error);
      this.openFailDialog(error.error.message);
    }
    // to prevent a bug where if the logout request failed 
    // this.stateService.removeCurrentUser();
    return throwError(() => new Error(''))
  }
}
