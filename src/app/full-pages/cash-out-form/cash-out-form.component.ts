import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'src/app/services/message.service';
import { environment } from 'src/app/environments/environment';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-cash-out-form',
  templateUrl: './cash-out-form.component.html',
  styleUrls: ['./cash-out-form.component.css']
})
export class CashOutFormComponent {
  cashOutForm: FormGroup;
  urlEndPoint = `${environment.API_HOST}/api/card-transaction/cash-out`
  cardId!: String;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ){
    this.cashOutForm = this.formBuilder.group (
      {
        balance: ['', [Validators.required, this.positiveBalanceValidator]],
        pin: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
      }
    )
    this.route.params.subscribe(params => {
      this.cardId = params['cardId'] ? params['cardId'] : 'Not set';
    })
  }

  sendBalance(): void {
    if (this.cashOutForm.invalid) {
      return;
    }

    const payload = {
      amount: this.cashOutForm.get('balance')?.value,
      cardId: this.cardId,
      pin: this.cashOutForm.get('pin')?.value
    }
    this.http.post<HttpResponse<any>>(this.urlEndPoint, payload)
    .pipe(
      catchError(this.handleError)
    )
    .subscribe(
      (response: HttpResponse<any>) => {
        console.log(response)
        // alert('Cash Out Complete!');
        this.router.navigateByUrl('/app/success')
      }
    )
    
  }

  positiveBalanceValidator(control: AbstractControl) {
    const balance = control.value;
    if (balance < 0) {
      return { negative: true };
    }
    return null;
  }

  goBack(): void {
    this.location.back();
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
