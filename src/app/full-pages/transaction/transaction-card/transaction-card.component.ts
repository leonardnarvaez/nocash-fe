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
  sign: string = '+';
  cssClass: string = 'price text-success';
  transactionCategory!: string;
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
    this.setTransactionCategory()
  }
  goToDetail() {
    this.route.navigateByUrl(`/app/transaction/${this.transaction.id}`);
  }

  setTransactionCategory() {
    switch(this.transaction.transactionType){
      case 'PAY_BILL':{
        this.transactionCategory = 'Bills Payment';
        break;
      }
      case 'CASH_OUT':
      case 'CASH_IN': {
        this.transactionCategory = 'Bank Tranfer';
        break;
      }
      case 'TRANSFER_FROM':
      case 'TRANSFER_TO':{
        this.transactionCategory = 'Money Transfer';
        break;
      }
    }
  }
}
