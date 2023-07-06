import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationHistoryListComponent } from './authentication-history-list/authentication-history-list.component';
import { AuthGuard } from 'src/app/shared/auth-guard.service';

const routes: Routes = [
  {
    path: "",
    component: AuthenticationHistoryListComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationHistoryRoutingModule { }
