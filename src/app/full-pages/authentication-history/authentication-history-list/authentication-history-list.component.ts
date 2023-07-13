import { Component, OnInit } from '@angular/core';
import { AuthenticationHistory } from 'src/app/models/authentication-history';
import { AuthenticationHistoryService } from 'src/app/services/authentication-history.service';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { getFirstAndLastDay } from 'src/app/util/date-util';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-authentication-history-list',
  templateUrl: './authentication-history-list.component.html',
  styleUrls: ['./authentication-history-list.component.css']
})
export class AuthenticationHistoryListComponent implements OnInit {
  authenticationHistoryList: AuthenticationHistory[];
  constructor(
    private authenticationHistoryService: AuthenticationHistoryService,
    private location: Location
  ) {
    this.authenticationHistoryList = [];
  }
  ngOnInit(): void {
    const [startDay, lastDay] = getFirstAndLastDay(new Date());
    this.authenticationHistoryService.findAllByInterval(startDay, lastDay)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe((authenticationHistoryList: AuthenticationHistory[]) => {
        console.log(authenticationHistoryList);
        this.authenticationHistoryList = authenticationHistoryList;
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
