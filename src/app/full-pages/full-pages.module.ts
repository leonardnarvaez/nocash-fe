import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullPagesRoutingModule } from './full-pages-routing.module';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    FullPagesRoutingModule,
  ]
})
export class FullPagesModule { }
