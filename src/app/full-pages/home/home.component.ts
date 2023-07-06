import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  walletBalance: number;
  urlEndPoint = "http://localhost:8080/api/card-transaction/balance"
  constructor(
    private http: HttpClient
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
