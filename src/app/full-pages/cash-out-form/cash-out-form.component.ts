import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { MessageService } from 'src/app/services/message.service';
import { environment } from 'src/app/environments/environment';

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
        balance: ['', [Validators.required]],
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
      cardId: this.cardId
    }
    this.http.post<HttpResponse<any>>(this.urlEndPoint, payload).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response)
      }
    )
    alert('Cash Out Complete!')
    this.router.navigateByUrl('/app/home')
  }

  goBack(): void {
    this.location.back();
  }
}
