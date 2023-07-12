import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { Location } from '@angular/common';
import { catchError, throwError } from 'rxjs';


@Component({
  selector: 'app-bill-payment-form',
  templateUrl: './bill-payment-form.component.html',
  styleUrls: ['./bill-payment-form.component.css']
})
export class BillPaymentFormComponent {
  billPaymentForm: FormGroup;
  urlEndPoint = `${environment.API_HOST}/api/merchant/payment`
  merchantId!: String;
  accountNumber!: String;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
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
  }
  
  payBill(): void {
    if (this.billPaymentForm.invalid) {
      return;
    }

    const payload = {
      amount: this.billPaymentForm.get('amount')?.value,
      merchantId: this.merchantId,
      accountNumber: this.billPaymentForm.get('accountNumber')?.value,
      pin: this.billPaymentForm.get('pin')?.value
    }
    this.http.post<HttpResponse<any>>(this.urlEndPoint, payload).pipe(
      catchError(this.handleError)
    ).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response)
        this.router.navigateByUrl('/app/success')
      }
    )
  }
  
  goBack(): void {
    this.location.back();
  }

  positiveBalanceValidator(control: AbstractControl) {
    const amount = control.value;
    if (amount < 0) {
      return { negative: true };
    }
    return null;
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
    return throwError(() => new Error(''))
  }
}
