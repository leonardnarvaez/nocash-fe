import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TransactionService } from 'src/app/services/transaction.service';
import { Transaction } from 'src/app/models/transaction';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css']
})
export class TransactionDetailComponent implements OnInit {
  transactionId: string;
  transaction: Transaction;
  header!: string;
  payee = {
    label: '',
    value: ''
  }
  transactionCategory!: string;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private transactionService: TransactionService
  ) {
    this.transactionId = ""; 
    this.transaction = new Transaction('', 0, '', '', '', '', new Date);
  }
  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.transactionId = data['transactionId'];
      this.transaction = this.transactionService.getTransaction(this.transactionId)?? this.transaction;
      this.setHeader();
      this.setTransactionCategory();
      console.log(this.transaction);
      
    })
  }

  goBack(): void {
    this.location.back();
  }

  setHeader() {
    switch(this.transaction.transactionType) {
      case 'PAY_BILL':
      case 'TRANSFER_TO':
      case 'CASH_OUT': {
        this.header = 'PAYMENT SENT'
        this.payee['label'] = 'To';
        break;
      }
      case 'TRANSFER_FROM':
      case 'CASH_IN':{
        this.header = 'PAYMENT RECEIVED';
        this.payee['label'] = 'From'
        break;
      }
    }
    this.payee['value'] = this.transaction.payee;
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
