import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Location } from '@angular/common';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../success-dialog/success-dialog.component';
import { FailDialogComponent } from '../../fail-dialog/fail-dialog.component';

@Component({
  selector: 'app-qrtransfer',
  templateUrl: './qrtransfer.component.html',
  styleUrls: ['./qrtransfer.component.css']
})
export class QRTransferComponent {
  currentPage: string;
  // mobileNumberForm: FormGroup;
  amountAndPinForm: FormGroup;
  doesMobileExists: boolean;
  dialogRef!: MatDialogRef<SuccessDialogComponent, FailDialogComponent>
  myPhoneNumber: string;
  scannedMobileNumber: string;
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
    this.amountAndPinForm = formBuilder.group(
      {
        amount: ['', [Validators.required, this.positiveBalanceValidator]],
        pin: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern('[0-9]{4}')]]
      }
    );
    this.doesMobileExists = false;
    this.myPhoneNumber = authState.getCurrentUser().mobileNumber;
    this.scannedMobileNumber = '';
  }

  verifyMobileNumber(mobileNumber: string): void {
    console.log(mobileNumber);
    const mobile = mobileNumber;
    this.scannedMobileNumber = mobileNumber;
    if(mobile === this.myPhoneNumber) {
      alert("you cannot transfer to yourself");
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
      mobileNumber: this.scannedMobileNumber,
      pin: this.amountAndPinForm.value.pin,
      amount: this.amountAndPinForm.value.amount
    }
    this.http.post<any>(this.transferURL, payload)
    .pipe(
      catchError(this.handleError)
    ).subscribe(response => {
      this.openSuccessDialog(response.message)
      console.info(response);
      this.currentPage = 'success-page';
    })
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

  positiveBalanceValidator(control: AbstractControl) {
    const balance = control.value;
    if (balance < 0) {
      return { negative: true };
    }
    return null;
  }

  get isGoBackDisabled() {
    // prevent user from going back the email page
    return this.currentPage === 'code-form' && !this.doesMobileExists
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
