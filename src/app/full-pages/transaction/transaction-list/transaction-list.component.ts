import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, map, take, throwError } from 'rxjs';
import { Transaction } from 'src/app/models/transaction';
import { TransactionService } from 'src/app/services/transaction.service';
import { Location } from '@angular/common';
import { getFirstAndLastDay, convertDate } from 'src/app/util/date-util';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  transactionList: Transaction[] = [];
  paginatedTransactionList: Transaction[] = [];
  pageSize: number;
  recordLength: number;
  constructor(
    private transactionService: TransactionService,
    private location: Location
  ) {
    this.pageSize = 10;
    this.recordLength = 0;
  }
  ngOnInit(): void {
    const [startDay, lastDay] = getFirstAndLastDay(new Date());
    this.fetchRecords(startDay, lastDay);
  }

  fetchRecords(startDate: Date, endDate: Date): void {
    this.transactionService.findAllByInterval(startDate, endDate)
      .pipe(
        catchError(this.handleError),
      )
      .subscribe((fetchedTransactionList: Transaction[]) => {
        console.log(fetchedTransactionList);
        this.transactionList = fetchedTransactionList;
        this.iterator(0);
        this.recordLength = fetchedTransactionList.length;
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
  page(p: PageEvent) {
    console.log(p);
    console.log(this.pageSize);
    this.pageSize = p.pageSize;
    this.iterator(p.pageIndex); 
  }
  goBack(): void {
    console.log("go back");
    
    this.location.back();
  }
  iterator(pageIndex: number): void {
    const startIndex = pageIndex * this.pageSize;
    this.paginatedTransactionList = this.transactionList.slice(startIndex, startIndex + this.pageSize);
  }

  changeDate(date: Date): void {
    console.log('from authentication');
    const [startDay, lastDay] = getFirstAndLastDay(date);
    this.fetchRecords(startDay, lastDay);
    console.log(date);
  }
}
