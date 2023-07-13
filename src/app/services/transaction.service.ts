import { Injectable } from '@angular/core';
import { CrudService } from '../api/crud-service';
import { Transaction } from '../models/transaction';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { convertDate } from '../util/date-util';

@Injectable({
  providedIn: 'root'
})
export class TransactionService extends CrudService<Transaction, string>{
  private readonly ENDPOINT: string = "/api/transaction/"
  private transactions: Transaction[];
  constructor(
    private http: HttpClient
  ) {
    super(http);
    super.baseUrl(this.ENDPOINT);
    this.transactions = [];
  }

  findAllByInterval(startDate: Date, endDate: Date): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.getBaseUrl(), {
      params: {
        'start-date': convertDate(startDate),
        'end-date': convertDate(endDate)
      }
    }).pipe(
      map((transactions: Transaction[]) => {
        return transactions.reverse();
      }),
      tap((transactions: Transaction[])=>{
        this.transactions = transactions;
      })
    )
  }

  getTransaction(transactionId: string): Transaction | undefined {
    return this.transactions.find((transaction: Transaction) => transaction.id === transactionId);
  }
}
