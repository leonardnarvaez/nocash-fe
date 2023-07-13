import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute} from '@angular/router';
import { User } from 'src/app/models/user';
import { catchError, throwError } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { FailDialogComponent } from 'src/app/full-pages/fail-dialog/fail-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  private returnUrl: string;
  loginForm!: FormGroup;
  submitted = false;
  dialogRef!: MatDialogRef<FailDialogComponent>;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute, private dialog: MatDialog){
    this.returnUrl =
    this.route.snapshot.queryParams["returnUrl"] || "/app/home";
  } 
  

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        mobileNumber: ["", [Validators. required, Validators.pattern("^(09|\\+639)\\d{9}$")]],
        pin: ["", [Validators.required, Validators.pattern('[0-9]{4}'), Validators.minLength(4), Validators.maxLength(4)]],

      },
    )
    console.log(this.returnUrl);
    if(this.authService.isAuthenticated()){
      this.router.navigateByUrl(this.returnUrl);
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value.mobileNumber, this.loginForm.value.pin)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.info(this.loginForm.value);
        
        // when an error occurs clear the pin
        this.loginForm.get('pin')?.reset();
        console.info(this.loginForm.value);
        return this.handleError(error)
      })
    )
    .subscribe((user: User) => {
      this.router.navigateByUrl(this.returnUrl);
      console.log(user);
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
