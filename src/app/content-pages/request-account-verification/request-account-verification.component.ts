import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';

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
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private http: HttpClient
  ){
    this.emailForm = formBuilder.group(
      {
        email: ['', [Validators.email, Validators.required]]  
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
      alert(response);
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
      alert(response);
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
