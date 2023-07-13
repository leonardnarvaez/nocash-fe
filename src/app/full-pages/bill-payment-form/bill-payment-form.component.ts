import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { Location } from '@angular/common';
import { catchError, throwError } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { Merchant } from 'src/app/models/merchant';
import { MerchantService } from 'src/app/services/merchant.service';
import { FailDialogComponent } from '../fail-dialog/fail-dialog.component';


@Component({
  selector: 'app-bill-payment-form',
  templateUrl: './bill-payment-form.component.html',
  styleUrls: ['./bill-payment-form.component.css']
})
export class BillPaymentFormComponent implements OnInit{
  merchant: Merchant;
  billPaymentForm: FormGroup;
  urlEndPoint = `${environment.API_HOST}/api/merchant/payment`
  merchantId!: string;
  accountNumber!: String;
  dialogRef!: MatDialogRef<SuccessDialogComponent, FailDialogComponent>;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private dialog: MatDialog,
    private merchantService: MerchantService
  ){
    this.billPaymentForm = this.formBuilder.group(
      {
        accountNumber: ['', [Validators.required]],
        amount: ['', [Validators.required, this.positiveBalanceValidator]],
        pin: ['',  [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
      }
    )
    this.route.params.subscribe(params => {
      this.merchantId = params['merchantId'] ? params['merchantId'] : 'Not set';
    })

    this.merchant = new Merchant('', '', '', new Date, '');
  }
  ngOnInit(): void {
   const retrievedMerchant: Merchant | undefined = this.merchantService.getMerchant(this.merchantId);
   if(typeof (retrievedMerchant) !== 'undefined') {
    this.merchant = retrievedMerchant;
   } else {
    this.merchantService.findOne(this.merchantId).subscribe((merchant: Merchant) => {
      this.merchant = merchant;
    });
   }
  }
  
  payBill(): void {
    try {
      this.dialogRef.close();
    } catch(e) {
      console.log(e);
      
    }
    if (this.billPaymentForm.invalid) {
      return;
    }
    const payload = {
      amount: this.billPaymentForm.get('amount')?.value,
      merchantId: this.merchantId,
      accountNumber: this.billPaymentForm.get('accountNumber')?.value,
      pin: this.billPaymentForm.get('pin')?.value
    }
    this.http.post<any>(this.urlEndPoint, payload).pipe(
      catchError(this.handleError)
    ).subscribe(response => {
      this.openSuccessDialog(response.message)
      console.info(response);
    });
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
  
  goBack(): void {
    this.location.back();
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
    const amount = control.value;
    if (amount < 0) {
      return { negative: true };
    }
    return null;
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
