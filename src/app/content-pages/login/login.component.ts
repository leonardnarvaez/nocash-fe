import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute} from '@angular/router';
import { User } from 'src/app/models/user';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  private returnUrl: string;
  loginForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute){
    this.returnUrl =
    this.route.snapshot.queryParams["returnUrl"] || "/app/home";
  } 
  

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        mobileNumber: [""],
        pin: [""],

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
      catchError(this.handleError)
    )
    .subscribe((user: User) => {
      this.router.navigateByUrl(this.returnUrl);
      console.log(user);
    });
    
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
    return throwError(() => new Error('HAHAHAHAHA'))
  }
}
