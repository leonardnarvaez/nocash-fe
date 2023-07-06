import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationHistoryRoutingModule } from './authentication-history-routing.module';
import { AuthenticationHistoryCardComponent } from './authentication-history-card/authentication-history-card.component';
import { AuthenticationHistoryListComponent } from './authentication-history-list/authentication-history-list.component';


@NgModule({
  declarations: [
    AuthenticationHistoryCardComponent,
    AuthenticationHistoryListComponent
  ],
  imports: [
    CommonModule,
    AuthenticationHistoryRoutingModule
  ]
})
export class AuthenticationHistoryModule { }
