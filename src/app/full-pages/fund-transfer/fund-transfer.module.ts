import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';

import { FundTransferRoutingModule } from './fund-transfer-routing.module';
import { TransferFormComponent } from './transfer-form/transfer-form.component';
import { QRPageComponent } from './qrpage/qrpage.component';


@NgModule({
  declarations: [
    TransferFormComponent,
    QRPageComponent,
  ],
  imports: [
    CommonModule,
    FundTransferRoutingModule,
    ReactiveFormsModule,
    QRCodeModule
  ],
  exports: [
    QRCodeModule
  ]
})
export class FundTransferModule { }
