import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "../shared/auth-guard.service";
import { HeaderComponent } from './header/header.component'

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
        path: "boss_mH4kuL3tz",
        component: HeaderComponent,
        data: {
          title: "Dashboard",
        },
        canActivate: [AuthGuard],
      },
    ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FullPagesRoutingModule { }
