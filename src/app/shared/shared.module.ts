import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthSelectorComponent } from './month-selector/month-selector.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';



@NgModule({
  declarations: [
    MonthSelectorComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MonthSelectorComponent,
    PageNotFoundComponent
  ]
})
export class SharedModule { }
