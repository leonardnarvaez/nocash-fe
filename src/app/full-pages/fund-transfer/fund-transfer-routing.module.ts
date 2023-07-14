import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransferFormComponent } from './transfer-form/transfer-form.component';
import { QRPageComponent } from './qrpage/qrpage.component';
import { QRTransferComponent } from './qrtransfer/qrtransfer.component';

const routes: Routes = [
  {
    path: 'form',
    component: TransferFormComponent
  },
  {
    path: 'qr-page',
    component: QRPageComponent
  },
  {
    path: 'qr-transfer',
    component: QRTransferComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FundTransferRoutingModule { }
