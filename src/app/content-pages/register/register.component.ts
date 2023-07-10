import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AuthStateService } from 'src/app/shared/auth-state.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService, 
    private router: Router, 
    private route: ActivatedRoute,
    private stateService: AuthStateService) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        emailAddress: [""],
        mobileNumber: [""],
        pin: [""],
      },
    )

    if(this.authService.isAuthenticated()) {
      this.router.navigateByUrl("/app/home");
    }
  }
  
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if(this.registerForm.invalid) {
      return;
    }
    const {emailAddress, mobileNumber, pin} = this.registerForm.value;
    this.authService.register(emailAddress, mobileNumber, pin)
    .pipe(catchError(this.handleError))
    .subscribe((user: User) => {
      this.router.navigateByUrl("/login");
    })
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
