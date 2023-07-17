import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthSelectorComponent } from './month-selector/month-selector.component';



@NgModule({
  declarations: [
    MonthSelectorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MonthSelectorComponent
  ]
})
export class SharedModule { }
