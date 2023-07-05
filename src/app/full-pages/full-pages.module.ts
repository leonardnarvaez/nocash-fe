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



@NgModule({
  declarations: [
    HeaderComponent,
    DashboardComponent,
    BottomNavComponent,
    MenuCardComponent,
    TransactionsHomeComponent,
    HomeHeaderComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    FullPagesRoutingModule,
  ]
})
export class FullPagesModule { }
