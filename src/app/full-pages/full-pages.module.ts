import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullPagesRoutingModule } from './full-pages-routing.module';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BottomNavComponent } from './dashboard/bottom-nav/bottom-nav.component';
import { MenuCardComponent } from './dashboard/menu-card/menu-card.component';
import { TransactionsHomeComponent } from './dashboard/transactions-home/transactions-home.component';
import { HomeHeaderComponent } from './dashboard/home-header/home-header.component';
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
import { SuccessBoxComponent } from './success-box/success-box.component';

@NgModule({
  declarations: [
    HeaderComponent,
    DashboardComponent,
    BottomNavComponent,
    MenuCardComponent,
    TransactionsHomeComponent,
    HomeHeaderComponent,
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
    SuccessBoxComponent,
  ],
  imports: [
    CommonModule,
    FullPagesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AuthenticationHistoryModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class FullPagesModule { }
