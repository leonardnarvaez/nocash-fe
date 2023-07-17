import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionCardComponent } from './transaction-card/transaction-card.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionRecentComponent } from './transaction-recent/transaction-recent.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    TransactionCardComponent,
    TransactionListComponent,
    TransactionRecentComponent,
    TransactionDetailComponent
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    MatPaginatorModule
  ],
  exports: [
    TransactionRecentComponent
  ]
})
export class TransactionModule { }
