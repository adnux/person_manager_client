import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from './datepicker.component';
import { CalendarModule } from '../calendar/calendar.module';


@NgModule({
  imports: [FormsModule, CalendarModule],
  declarations: [DatePickerComponent],
  exports: [DatePickerComponent]
})
export class DatePickerModule { }
