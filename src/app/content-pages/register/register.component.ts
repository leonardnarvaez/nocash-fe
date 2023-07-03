import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute) {
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
      this.router.navigateByUrl("/dashboard");
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
    .subscribe((user: User) => {
      this.router.navigateByUrl("/login");
      
    })
  }
}
