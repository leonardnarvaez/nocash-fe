import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FailDialogComponent } from 'src/app/full-pages/fail-dialog/fail-dialog.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm!: FormGroup;
  submitted = false;
  dialogRef!: MatDialogRef<FailDialogComponent>;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService, 
    private router: Router, 
    private route: ActivatedRoute,
    private stateService: AuthStateService,
    private location: Location,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        emailAddress: ["", [Validators.required, Validators.pattern('^(?:(?!.*?[.]{2})[a-zA-Z0-9](?:[a-zA-Z0-9.+!%-]{1,64}|)|\"[a-zA-Z0-9.+!% -]{1,64}\")@[a-zA-Z0-9][a-zA-Z0-9.-]+(.[a-z]{2,}|.[0-9]{1,})$')]],
        username: ["", Validators.required],
        mobileNumber: ["", [Validators. required, Validators.pattern("^(09|\\+639)\\d{9}$")]],
        pin: ["", [Validators.required, Validators.pattern('[0-9]{4}'), Validators.minLength(4), Validators.maxLength(4)]],
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
    const {emailAddress, username, mobileNumber, pin} = this.registerForm.value;
    console.log(this.registerForm.value);
    
    this.authService.register(emailAddress, mobileNumber, pin, username)
    .pipe(catchError(this.handleError))
    .subscribe((user: User) => {
      this.router.navigateByUrl("/verify-account");
    })
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

  goBack(): void {
    this.location.back();
  }
}
