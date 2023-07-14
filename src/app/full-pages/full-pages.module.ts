import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullPagesRoutingModule } from './full-pages-routing.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { MerchantComponent } from './merchant/merchant.component';
import { MerchantListComponent } from './merchant-list/merchant-list.component';
import { CardComponent } from './card/card.component';
import { CardListComponent } from './card-list/card-list.component';
import { AddCardFormComponent } from './add-card-form/add-card-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthenticationHistoryModule } from './authentication-history/authentication-history.module';
import { CashInComponent } from './cash-in/cash-in.component';
import { CashInFormComponent } from './cash-in-form/cash-in-form.component';
import { CashOutComponent } from './cash-out/cash-out.component';
import { CashOutFormComponent } from './cash-out-form/cash-out-form.component';
import { PinResetComponent } from './pin-reset/pin-reset.component';
import { BillPaymentFormComponent } from './bill-payment-form/bill-payment-form.component';
import { SettingsPanelComponent } from './settings-panel/settings-panel.component';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FailDialogComponent } from './fail-dialog/fail-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { TransactionRecentComponent } from './transaction/transaction-recent/transaction-recent.component';
import { TransactionModule } from './transaction/transaction.module';
import { FundTransferModule } from './fund-transfer/fund-transfer.module';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    MerchantComponent,
    MerchantListComponent,
    CardComponent,
    CardListComponent,
    AddCardFormComponent,
    CashInComponent,
    CashInFormComponent,
    CashOutComponent,
    CashOutFormComponent,
    PinResetComponent,
    BillPaymentFormComponent,
    SettingsPanelComponent,
    SuccessDialogComponent,
    FailDialogComponent,
  ],
  imports: [
    CommonModule,
    FullPagesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AuthenticationHistoryModule,
    MatButtonModule,
    MatDialogModule,
    HttpClientModule,
    TransactionModule,
    FundTransferModule
  ]
})
export class FullPagesModule { }
