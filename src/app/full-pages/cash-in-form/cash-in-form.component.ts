import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MessageService } from 'src/app/services/message.service';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-cash-in-form',
  templateUrl: './cash-in-form.component.html',
  styleUrls: ['./cash-in-form.component.css']
})
export class CashInFormComponent {
  topUpForm: FormGroup;
  urlEndPoint = `${environment.API_HOST}/api/card-transaction/cash-in`
  cardId!: String;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.topUpForm = this.formBuilder.group (
      {
        balance: ['', [Validators.required]],
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
      cardId: this.cardId
    }
    this.http.post<HttpResponse<any>>(this.urlEndPoint, payload).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response)
      }
    )
    this.router.navigateByUrl('/app/home')
  }

  goBack(): void {
    this.location.back();
  }

}
