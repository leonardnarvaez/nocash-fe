import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Location } from '@angular/common';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FailDialogComponent } from '../../fail-dialog/fail-dialog.component';
import { SuccessDialogComponent } from '../../success-dialog/success-dialog.component';

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.css']
})
export class TransferFormComponent {
  currentPage: string;
  mobileNumberForm: FormGroup;
  amountAndPinForm: FormGroup;
  doesMobileExists: boolean;
  dialogRef!: MatDialogRef<SuccessDialogComponent,FailDialogComponent>;

  myPhoneNumber: string;
  recipientInfo: any;
  verifyMobileNumberURL = environment.API_HOST + '/api/money-transfer/you-there';
  transferURL = environment.API_HOST + '/api/money-transfer/transfer';
  constructor(
    private http: HttpClient,
    private authState: AuthStateService,
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location,
    private dialog: MatDialog
  ) {
    this.currentPage = 'mobile-number-page';
    this.mobileNumberForm = formBuilder.group(
      {
        mobileNumber: ["", [Validators.required, Validators.pattern("^(09|\\+639)\\d{9}$")]]
      }
    );
    this.amountAndPinForm = formBuilder.group(
      {
        amount: ['', [Validators.required, this.positiveBalanceValidator, this.topUpLimitValidator]],
        pin: ['', [Validators.required, Validators.pattern('[0-9]{4}')]]
      }
    );
    this.doesMobileExists = false;
    this.myPhoneNumber = authState.getCurrentUser().mobileNumber;
  }
  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }

  verifyMobileNumber(): void {
    const mobile = this.mobileNumberForm.value.mobileNumber;
    if(mobile === this.myPhoneNumber) {
      this.openFailDialog("Self transfer is not allowed");
      return;
    }
    const payload = {
      mobileNumber: mobile,
      pin: '',
      amount: 0
    }
    this.http.post<any>(this.verifyMobileNumberURL, payload)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe(response => {
        this.currentPage = 'transfer-page';
        this.doesMobileExists = true;
        console.log(response);
        this.recipientInfo = response;
      })
  }

  transfer(): void {
    const payload = {
      mobileNumber: this.mobileNumberForm.value.mobileNumber,
      pin: this.amountAndPinForm.value.pin,
      amount: this.amountAndPinForm.value.amount
    }
    this.http.post<any>(this.transferURL, payload)
    .pipe(
      catchError(this.handleError)
    ).subscribe(response => {
      console.log(response);
      this.openSuccessDialog(response.message);
      this.currentPage = 'success-page';
    })
  }

  topUpLimitValidator(control: AbstractControl) {
    const balance = control.value;
    if (balance > 50000) {
      return { overLimit: true };
    }
    return null;
  }

  positiveBalanceValidator(control: AbstractControl) {
    const amount = control.value;
    if (amount < 0) {
      return { negative: true };
    }
    return null;
  }

  goBack(): void {
    if(this.currentPage === 'mobile-number-page') {
      this.location.back();
    } else if(this.currentPage === 'transfer-page' && !this.doesMobileExists) {
      this.currentPage = 'mobile-number-pahe'
    } else if(this.currentPage === 'success-page') {
      this.router.navigateByUrl('/app/home');
    }
  }

  get isGoBackDisabled() {
    // prevent user from going back the email page
    return this.currentPage === 'code-form' && !this.doesMobileExists
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
