import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "../shared/auth-guard.service";
import { HeaderComponent } from './header/header.component'
import { HomeComponent } from './home/home.component';
import { MerchantListComponent } from './merchant-list/merchant-list.component';
import { CardListComponent } from './card-list/card-list.component';
import { AddCardFormComponent } from './add-card-form/add-card-form.component';
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
        canActivate: [AuthGuard],
      },
      {
        path: "home",
        component: HomeComponent,
        data: {
          title: "Home",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "merchants",
        component: MerchantListComponent,
        data: {
          title: "Merchants",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "cards",
        component: CardListComponent,
        data: {
          title: "Cards"
        },
        canActivate: [AuthGuard]
      },
      {
        path: "create",
        component: AddCardFormComponent,
        data: {
          title: "Add Card"
        },
        
      },
      {
        canActivate: [AuthGuard],
        path: "authentication-history",
        loadChildren: () => import('./authentication-history/authentication-history.module').then(m => m.AuthenticationHistoryModule)
      }
    ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FullPagesRoutingModule { }
