import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute} from '@angular/router';
import { User } from 'src/app/models/user';


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
    this.route.snapshot.queryParams["returnUrl"] || "/dashboard";
  } 
  

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        mobileNumber: [""],
        pin: [""],

      },
    )
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
    .subscribe((user: User) => {
      this.router.navigateByUrl(this.returnUrl);
      console.log(user);
    });
    
  }
}
