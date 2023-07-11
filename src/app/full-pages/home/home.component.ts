import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { Subscription } from "rxjs";
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  walletBalance: number;
  urlEndPoint = `${environment.API_HOST}/api/card-transaction/balance`
  messageSubscription!: Subscription;
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
    this.walletBalance = 0;

  }
  ngOnInit(): void {
    this.http.get<number>(this.urlEndPoint)
    .subscribe((balance: number) => {
      this.walletBalance = balance;
    });
  }



  
}
