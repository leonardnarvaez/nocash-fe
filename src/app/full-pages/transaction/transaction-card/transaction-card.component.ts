import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from 'src/app/models/transaction';

@Component({
  selector: 'app-transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.css']
})
export class TransactionCardComponent implements OnInit {
  @Input() transaction!:Transaction;
  sign: string = '-';
  cssClass: string = 'price text-success';
  constructor(
    private route: Router
  ) {

  }
  ngOnInit(): void {
    switch(this.transaction.transactionType) {
      case 'CASH_OUT':
      case 'PAY_BILL':
      case 'TRANSFER_TO': {
        this.cssClass = 'price text-danger';
        this.sign = '-'
      }
    }
  }
  goToDetail() {
    this.route.navigateByUrl(`/app/transaction/${this.transaction.id}`);
  }
}
