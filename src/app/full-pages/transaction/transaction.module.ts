import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionCardComponent } from './transaction-card/transaction-card.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionRecentComponent } from './transaction-recent/transaction-recent.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { SharedModule } from 'src/app/shared/shared.module';

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
    MatPaginatorModule,
    SharedModule
  ],
  exports: [
    TransactionRecentComponent
  ]
})
export class TransactionModule { }
