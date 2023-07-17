import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationHistory } from 'src/app/models/authentication-history';

@Component({
  selector: 'app-authentication-history-card',
  templateUrl: './authentication-history-card.component.html',
  styleUrls: ['./authentication-history-card.component.css']
})
export class AuthenticationHistoryCardComponent implements OnInit {
  @Input() authenticationHistory!: AuthenticationHistory;
  userAgentTrimmed: string;
  constructor() {
    this.userAgentTrimmed = '';
  }
  ngOnInit(): void {
    const userAgent = this.authenticationHistory.userAgent;

    try{
      const start = userAgent.indexOf('(');
      const end = userAgent.indexOf(')') + 1;
      this.userAgentTrimmed = userAgent.substring(start, end);
    } catch(e) {
      this.userAgentTrimmed = userAgent;
    }

    // console.log(start);
    // console.log(end);
    
    console.log(this.userAgentTrimmed);
    
  }

}
