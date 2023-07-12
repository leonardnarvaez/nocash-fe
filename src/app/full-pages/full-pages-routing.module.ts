import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component'
import { HomeComponent } from './home/home.component';
import { MerchantListComponent } from './merchant-list/merchant-list.component';
import { CardListComponent } from './card-list/card-list.component';
import { AddCardFormComponent } from './add-card-form/add-card-form.component';
import { CashInComponent } from './cash-in/cash-in.component';
import { CashInFormComponent } from './cash-in-form/cash-in-form.component';
import { CashOutComponent } from './cash-out/cash-out.component';
import { PinResetComponent } from './pin-reset/pin-reset.component';
import { BillPaymentFormComponent } from './bill-payment-form/bill-payment-form.component';
import { CashOutFormComponent } from './cash-out-form/cash-out-form.component';
import { SettingsPanelComponent } from './settings-panel/settings-panel.component';
const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "dashboard",
        component: HeaderComponent,
        data: {
          title: "Dashboard",
        },
      },
      {
        path: "home",
        component: HomeComponent,
        data: {
          title: "Home",
        },
      },
      {
        path: "merchants",
        component: MerchantListComponent,
        data: {
          title: "Merchants",
        },
      },
      {
        path: "cards",
        component: CardListComponent,
        data: {
          title: "Cards"
        },
      },
      {
        path: "create",
        component: AddCardFormComponent,
        data: {
          title: "Add Card"
        },
        
      },
      {
        path: "top-up",
        component: CashInComponent,
        data: {
          title: "Top Up"
        },
      },
      {
        path: "top-up-form/:cardId",
        component: CashInFormComponent,
        data: {
          title: "Top Up Form"
        },
      },
      {
        path: "cash-out",
        component: CashOutComponent,
        data: {
          title: "Cash Out"
        },
      },
      {
        path: "cash-out-form/:cardId",
        component: CashOutFormComponent,
        data: {
          title: "Cash Out Form"
        },
      },
      {
        path: "merchants/:merchantId",
        component: BillPaymentFormComponent,
        data: {
          title: "Bill Payment Form"
        },
        
      },
      {
        path: "merchants/:merchantId",
        component: BillPaymentFormComponent,
        data: {
          title: "Bill Payment Form"
        },
        
      },
      {
        path: "merchants/:merchantId",
        component: BillPaymentFormComponent,
        data: {
          title: "Bill Payment Form"
        },
      
      },
      {
        path: "merchants/:merchantId",
        component: BillPaymentFormComponent,
        data: {
          title: "Bill Payment Form"
        },
        
      },
      {
        path: "settings",
        component: SettingsPanelComponent,
        data: {
          title: "Settings",
        },
      },
      {
        path: "authentication-history",
        loadChildren: () => import('./authentication-history/authentication-history.module').then(m => m.AuthenticationHistoryModule)
      },
      {
        path: 'pin-reset',
        component: PinResetComponent
      }
    ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FullPagesRoutingModule { }
