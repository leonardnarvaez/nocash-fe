import { Injectable } from '@angular/core';
import { CrudService } from '../api/crud-service';
import { AuthenticationHistory } from '../models/authentication-history';
import { HttpClient } from '@angular/common/http';
import { convertDate } from '../util/date-util';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationHistoryService extends CrudService<AuthenticationHistory, String>{
  private readonly ENDPOINT: string = "/api/authentication-history/"
  private authenticationHistoryList: AuthenticationHistory[] = [];
  constructor(
    private http: HttpClient
  ) {
    super(http);
    super.baseUrl(this.ENDPOINT);
  }

  findAllByInterval(startDate: Date, endDate: Date): Observable<AuthenticationHistory[]> {
    return this.http.get<AuthenticationHistory[]>(this.getBaseUrl(), {
      params: {
        'start-date': convertDate(startDate),
        'end-date': convertDate(endDate)
      }
    }).pipe(
      map((authenticationHistoryList: AuthenticationHistory[]) => {
        return authenticationHistoryList.sort((item1, item2) => new Date(item2.creationTime).getTime() - new Date(item1.creationTime).getTime());
      }),
      tap((authenticationHistoryList: AuthenticationHistory[])=>{
        this.authenticationHistoryList = authenticationHistoryList;
      })
    )
  }

  getTransaction(authenticationHistoryId: string): AuthenticationHistory | undefined {
    return this.authenticationHistoryList.find((authenticationHistory: AuthenticationHistory) => authenticationHistory.id === authenticationHistoryId);
  }
}
