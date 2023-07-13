import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, take, throwError } from 'rxjs';
import { Transaction } from 'src/app/models/transaction';
import { TransactionService } from 'src/app/services/transaction.service';
import { Location } from '@angular/common';
import { getFirstAndLastDay, convertDate } from 'src/app/util/date-util';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  transactionList: Transaction[] = [];
  constructor(
    private transactionService: TransactionService,
    private location: Location
  ) {}
  ngOnInit(): void {
    const [startDay, lastDay] = getFirstAndLastDay(new Date());
    this.transactionService.findAllByInterval(startDay, lastDay)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe((fetchedTransactionList: Transaction[]) => {
        console.log(fetchedTransactionList);
        this.transactionList = fetchedTransactionList;
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

  goBack(): void {
    console.log("go back");
    
    this.location.back();
  }
}
