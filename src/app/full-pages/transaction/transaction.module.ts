import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionCardComponent } from './transaction-card/transaction-card.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionRecentComponent } from './transaction-recent/transaction-recent.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';


@NgModule({
  declarations: [
    TransactionCardComponent,
    TransactionListComponent,
    TransactionRecentComponent,
    TransactionDetailComponent
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule
  ],
  exports: [
    TransactionRecentComponent
  ]
})
export class TransactionModule { }
