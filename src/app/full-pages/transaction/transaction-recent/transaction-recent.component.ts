import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';
import { TransactionService } from 'src/app/services/transaction.service';
import { getFirstAndLastDay } from 'src/app/util/date-util';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-transaction-recent',
  templateUrl: './transaction-recent.component.html',
  styleUrls: ['./transaction-recent.component.css']
})
export class TransactionRecentComponent implements OnInit {
  transactionList: Transaction[] = [];
  recentTransactions: Transaction[] = [];
  constructor(
    private transactionService: TransactionService,
  ){}
  ngOnInit(): void {
    const [startDay, lastDay] = getFirstAndLastDay(new Date());
    this.transactionService.findAllByInterval(startDay, lastDay)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe((fetchedTransactionList: Transaction[]) => {
        console.log(fetchedTransactionList);
        this.transactionList = fetchedTransactionList;
        if(this.transactionList.length > 5) {
          this.recentTransactions = this.transactionList.slice(0, 6);
        } else {
          this.recentTransactions = this.transactionList;
        }
      })
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
