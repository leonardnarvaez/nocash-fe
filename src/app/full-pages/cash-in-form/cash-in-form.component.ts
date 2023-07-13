import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'src/app/services/message.service';
import { environment } from 'src/app/environments/environment';
import { catchError, throwError } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { FailDialogComponent } from '../fail-dialog/fail-dialog.component';

@Component({
  selector: 'app-cash-in-form',
  templateUrl: './cash-in-form.component.html',
  styleUrls: ['./cash-in-form.component.css']
})
export class CashInFormComponent {
  topUpForm: FormGroup;
  urlEndPoint = `${environment.API_HOST}/api/card-transaction/cash-in`
  cardId!: String;
  dialogRef!: MatDialogRef<SuccessDialogComponent, FailDialogComponent>;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private dialog: MatDialog
  ) {
    this.topUpForm = this.formBuilder.group (
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
    if (this.topUpForm.invalid) {
      return;
    }

    const payload = {
      amount: this.topUpForm.get('balance')?.value,
      cardId: this.cardId,
      pin: this.topUpForm.get('pin')?.value
    }
    this.http.post<any>(this.urlEndPoint, payload)
    .pipe(
      catchError(this.handleError)
    )
    .subscribe(response => {
      this.openSuccessDialog(response.message);
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
}
