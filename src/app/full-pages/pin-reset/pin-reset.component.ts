import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { environment } from 'src/app/environments/environment';
import { Location } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MustMatch } from './must-match-validator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { FailDialogComponent } from '../fail-dialog/fail-dialog.component';
@Component({
  selector: 'app-pin-reset',
  templateUrl: './pin-reset.component.html',
  styleUrls: ['./pin-reset.component.css']
})
export class PinResetComponent implements OnInit{
  pinResetForm: FormGroup;
  pinResetURL = environment.API_HOST + '/api/security/pin-reset/';
  dialogRef!: MatDialogRef<SuccessDialogComponent, FailDialogComponent>;
  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.pinResetForm = formBuilder.group({
      oldPin: ['', [Validators.required, Validators.pattern('[0-9]{4}'), Validators.minLength(4), Validators.maxLength(4)]],
      newPin: ['', [Validators.required, Validators.pattern('[0-9]{4}'), Validators.minLength(4), Validators.maxLength(4)]],
      confirmPin: ['', [Validators.required, Validators.pattern('[0-9]{4}'), Validators.minLength(4), Validators.maxLength(4)]]
    }, { validator: MustMatch("newPin", "confirmPin")});
  }
  ngOnInit(): void {
  }

  resetPin(): void {
    const payload = {
      oldPIN: this.pinResetForm.value.oldPin,
      newPIN: this.pinResetForm.value.newPin
    }
    console.log(payload);
    this.http.post<any>(this.pinResetURL, payload)
    .pipe(catchError(this.handleError))
      .subscribe((response: any) => {
        console.log(response);
        this.openSuccessDialog(response.message);
      });
  }

  goBack(): void {
    this.location.back();
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

  pinEqualsValidator(control: AbstractControl) {
    const newPin: string = control.get('newPin')?.value;
    const confirmPin: string = control.get('confirmPin')?.value;
    
    if (newPin !== confirmPin) {
      return { notEqual: true}
    }
    return null;
  } 
}
