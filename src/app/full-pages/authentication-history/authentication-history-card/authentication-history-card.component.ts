import { Component, Input } from '@angular/core';
import { AuthenticationHistory } from 'src/app/models/authentication-history';

@Component({
  selector: 'app-authentication-history-card',
  templateUrl: './authentication-history-card.component.html',
  styleUrls: ['./authentication-history-card.component.css']
})
export class AuthenticationHistoryCardComponent {
  @Input() authenticationHistory!: AuthenticationHistory;
}
