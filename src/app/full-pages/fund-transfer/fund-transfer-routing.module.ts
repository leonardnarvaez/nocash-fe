import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransferFormComponent } from './transfer-form/transfer-form.component';

const routes: Routes = [
  {
    path: 'form',
    component: TransferFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FundTransferRoutingModule { }
