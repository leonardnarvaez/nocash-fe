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
import { PinResetComponent } from './pin-reset/pin-reset.component';

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
  ],
  imports: [
    CommonModule,
    FullPagesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AuthenticationHistoryModule
  ]
})
export class FullPagesModule { }
