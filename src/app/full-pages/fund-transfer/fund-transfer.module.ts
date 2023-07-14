import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FundTransferRoutingModule } from './fund-transfer-routing.module';
import { TransferFormComponent } from './transfer-form/transfer-form.component';


@NgModule({
  declarations: [
    TransferFormComponent
  ],
  imports: [
    CommonModule,
    FundTransferRoutingModule,
    ReactiveFormsModule
  ]
})
export class FundTransferModule { }
