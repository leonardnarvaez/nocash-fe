import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { FundTransferRoutingModule } from './fund-transfer-routing.module';
import { TransferFormComponent } from './transfer-form/transfer-form.component';
import { QRPageComponent } from './qrpage/qrpage.component';
import { QRTransferComponent } from './qrtransfer/qrtransfer.component';


@NgModule({
  declarations: [
    TransferFormComponent,
    QRPageComponent,
    QRTransferComponent,
  ],
  imports: [
    CommonModule,
    FundTransferRoutingModule,
    ReactiveFormsModule,
    QRCodeModule,
    ZXingScannerModule
  ],
  exports: [
    QRCodeModule
  ]
})
export class FundTransferModule { }
