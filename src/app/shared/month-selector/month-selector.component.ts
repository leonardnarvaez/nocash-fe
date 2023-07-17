import { Component, EventEmitter, Output } from '@angular/core';
import { getFirstAndLastDay, getFirstDay, getLastDay, getMonthAndYear, previousMonth, nextMonth } from 'src/app/util/date-util';
@Component({
  selector: 'app-month-selector',
  templateUrl: './month-selector.component.html',
  styleUrls: ['./month-selector.component.css']
})
export class MonthSelectorComponent {
  @Output() changeMonthEvent = new EventEmitter<Date>;
  now: Date = new Date();
  currentMonth: Date = this.now;
  monthYear: string;
  constructor() {
    console.log(this.now);
    
    this.monthYear = getMonthAndYear(this.currentMonth);
  }
  isNextDisabled(): boolean {
    return getFirstDay(this.currentMonth) >= getFirstDay(this.now);
  }
  previousMonth(): void {    
    this.currentMonth = previousMonth(this.currentMonth);
    this.monthYear = getMonthAndYear(this.currentMonth);
    this.changeMonthEvent.emit(this.currentMonth);
    console.log('previous month');
  }

  nextMonth(): void {
    console.log(this.isNextDisabled());
    if(this.isNextDisabled()) return; 
    this.currentMonth = nextMonth(this.currentMonth);
    this.monthYear = getMonthAndYear(this.currentMonth);
    console.log('next month');
    this.changeMonthEvent.emit(this.currentMonth);
  }
}
