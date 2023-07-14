import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/app/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';
import { ContentDialogComponent } from '../content-dialog/content-dialog.component';
import { FailDialogComponent } from 'src/app/full-pages/fail-dialog/fail-dialog.component';

@Component({
  selector: 'app-request-account-verification',
  templateUrl: './request-account-verification.component.html',
  styleUrls: ['./request-account-verification.component.css']
})
export class RequestAccountVerificationComponent {
  emailForm: FormGroup;
  codeForm: FormGroup;
  currentPage: string;
  accountVerificationRequestUrl = environment.API_HOST + '/authentication/request-email-verification';
  reactivationUrl = environment.API_HOST + '/authentication/verify-email';
  isCodeRequestSuccess: boolean = false;
  isAccountVerificationSuccess: boolean = false;
  dialogRef!: MatDialogRef<ContentDialogComponent, FailDialogComponent>
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private http: HttpClient,
    private dialog: MatDialog
  ){
    this.emailForm = formBuilder.group(
      {
        email: ['', [Validators.required, Validators.pattern('^(?:(?!.*?[.]{2})[a-zA-Z0-9](?:[a-zA-Z0-9.+!%-]{1,64}|)|\"[a-zA-Z0-9.+!% -]{1,64}\")@[a-zA-Z0-9][a-zA-Z0-9.-]+(.[a-z]{2,}|.[0-9]{1,})$')]]  
      }
    )
    this.codeForm = formBuilder.group(
      {
        code: ['', Validators.required]
      }
    )
    this.currentPage = "main";
  }
  

  ngOnInit(): void {
    if(this.authService.isAuthenticated()) {
      this.router.navigateByUrl("/app/home");
    }
  }


  requestAccountVerificationCode(): void {
    this.http.post<any>(this.accountVerificationRequestUrl, this.emailForm.value)
    .pipe(catchError(this.handleError))
    .subscribe(response => {
      this.openSuccessDialog(response.message);
      console.info(response);
      this.currentPage = 'code-form';
      this.isCodeRequestSuccess = true;
    });
  }

  activateAccount(): void {
    const email = this.emailForm.value['email'];
    const code = this.codeForm.value['code'];
    console.log({email, code});
    this.http.post<any>(this.reactivationUrl, {email, code})
    .pipe(catchError(this.handleError))
    .subscribe(response => {
      this.openSuccessDialog(response.message);
      console.info(response);
      this.currentPage = 'success-page';
      this.isAccountVerificationSuccess = true;
    });
  }

  goBack(): void {
    if(this.currentPage === 'main') {
      this.location.back();
    } else if(this.currentPage === 'code-form' && !this.isCodeRequestSuccess) {
      this.currentPage = 'main'
    } else if(this.currentPage === 'success-page') {
      this.router.navigateByUrl('/login');
    }
  }

  get isGoBackDisabled() {
    // prevent user from going back the email page
    return this.currentPage === 'code-form' && !this.isCodeRequestSuccess
  }

  openSuccessDialog(successMessage: string): void {
    const dialogRef = this.dialog.open(ContentDialogComponent, {
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
    return throwError(() => new Error(''))
  }
}
