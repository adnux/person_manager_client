import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { VIEWFORMAT } from '../datepicker/datepicker.component';
import * as moment from 'moment';

interface CalendarDate {
  day: number;
  month: number;
  year: number;
  isMonthOfSelectDate: boolean;
  isSelectDate: boolean;
}

export interface LocaleSettings {
  dayNames: string[];
  monthNames: string[];
}

const WEEK = 6;

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html'
})
export class CalendarComponent implements OnInit {

  @Input() viewFormat: string = VIEWFORMAT;

  @Input() show: boolean = true;

  @Input() set selectedDate(value: string) {
    if (value) {
      this.date = moment(value, this.viewFormat, true);
    } else {
      this.date = moment();
    }
    this.generateCalendarForSelectDateMonth();


  }

  @Input() locale: LocaleSettings = {
    dayNames: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto',
      'Setembro', 'Outubro', 'Novembro', 'Dezembro']
  };

  @Output() onSelectDate: EventEmitter<any> = new EventEmitter();

  days: CalendarDate[] = [];

  private date: any = moment();

  get month() {
    return this.date.month();
  }

  get year() {
    return this.date.year();
  }

  get day() {
    return this.date.date();
  }

  ngOnInit() {
    this.generateCalendarForSelectDateMonth();
  }

  nextMonth() {
    this.date.add(1, 'month');
    this.selectedDate = this.date.format(this.viewFormat);
  }

  prevMonth() {
    this.date.subtract(1, 'month');
    this.selectedDate = this.date.format(this.viewFormat);
  }

  nextYear() {
    this.date.add(1, 'year');
    this.selectedDate = this.date.format(this.viewFormat);
  }

  prevYear() {
    this.date.subtract(1, 'year');
    this.selectedDate = this.date.format(this.viewFormat);
  }

  selectDate(calendarDate: CalendarDate) {

    this.date.set('date', calendarDate.day);
    this.date.set('month', calendarDate.month);
    this.date.set('year', calendarDate.year);

    this.selectedDate = this.date.format(this.viewFormat);

    if (calendarDate.isMonthOfSelectDate) {
      this.onSelectDate.emit(this.date.format(this.viewFormat));
    }
  }


  private generateCalendarForSelectDateMonth() {
    this.days = [];
    const startDay = this.date.clone().startOf('month');
    startDay.subtract(startDay.weekday(), 'days');

    const endDay = this.date.clone().endOf('month');
    endDay.add(WEEK - endDay.weekday(), 'days');

    while (startDay.isSameOrBefore(endDay)) {
      this.days.push({
        day: startDay.date(),
        month: startDay.month(),
        year: startDay.year(),
        isMonthOfSelectDate: startDay.month() === this.date.month(),
        isSelectDate: startDay.format(this.viewFormat) === this.date.format(this.viewFormat)
      });
      startDay.add(1, 'days');
    }
  }

}
