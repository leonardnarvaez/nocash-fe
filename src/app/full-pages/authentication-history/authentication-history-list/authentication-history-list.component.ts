import { Component, OnInit } from '@angular/core';
import { AuthenticationHistory } from 'src/app/models/authentication-history';
import { AuthenticationHistoryService } from 'src/app/services/authentication-history.service';

@Component({
  selector: 'app-authentication-history-list',
  templateUrl: './authentication-history-list.component.html',
  styleUrls: ['./authentication-history-list.component.css']
})
export class AuthenticationHistoryListComponent implements OnInit {
  authenticationHistoryList: AuthenticationHistory[];
  constructor(
    private authenticationHistoryService: AuthenticationHistoryService
  ) {
    this.authenticationHistoryList = [];
  }
  ngOnInit(): void {
    this.authenticationHistoryService.findAll().subscribe((fetchedAuthenticationHistory: AuthenticationHistory[]) => {
      console.log(fetchedAuthenticationHistory);
      this.authenticationHistoryList = fetchedAuthenticationHistory.reverse();
    });
  }

}
