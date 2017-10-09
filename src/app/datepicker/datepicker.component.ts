import * as moment from 'moment';
import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';


export const VIEWFORMAT = 'DD/MM/YYYY';
const MODELFORMAT = 'YYYY-MM-DD';
const INVALID_DATE = 'Invalid date';

export function datePickerValidator(c: FormControl) {
  return (c.value === INVALID_DATE) ? {
    validateDate: {
      valid: false
    }
  } : null;
}

@Component({
  selector: 'datepicker',
  templateUrl: './datepicker.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DatePickerComponent },
    { provide: NG_VALIDATORS, multi: true, useValue: datePickerValidator }
  ]
})
export class DatePickerComponent implements ControlValueAccessor, OnInit, OnDestroy {

  @Input() viewFormat: string = VIEWFORMAT;
  @Input() modelFormat: string = MODELFORMAT;
  @Input() id: string;
  @ViewChild('input') input;
  @Input() disable: boolean = false;

  showCalendar: boolean = false;

  private date: string = '';
  private OnTouched: (value: any) => void;
  private unRegisterGlobalClick: any;


  constructor(private elementRef: ElementRef, private renderer: Renderer) { }

  get value(): any {
    return this.date;
  }

  set value(value: any) {
    this.date = value;
    const dateFromView = moment(this.date, this.viewFormat);
    if (dateFromView.isValid()) {
      const dateFormat = dateFromView.format(this.viewFormat);
      const datePart = dateFormat.slice(0, this.date.length + 1);
      const viewFormatPart = this.viewFormat.slice(0, this.date.length + 1);
      if (viewFormatPart.charAt(viewFormatPart.length - 1) === datePart.charAt(datePart.length - 1)) {
        this.date = datePart;
      }
    }
    if (!this.date) {
      this.onChange('');
    } else {
      const dateToModel = moment(this.date, this.viewFormat, true).format(this.modelFormat);
      this.onChange(dateToModel);
    }
  }

  writeValue(obj: any): void {
    if (obj) {
      this.date = moment(obj, this.modelFormat).format(this.viewFormat);
    } else {
      this.date = null;
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: (value: any) => void): void {
    this.OnTouched = fn;
  }

  getDateToCalendar() {

    const dateToCalendar = moment(this.value, this.viewFormat, true);
    if (dateToCalendar.isValid()) {
      return dateToCalendar.format(this.viewFormat);
    }
    return '';

  }

  onClickInput() {
    if(!this.disable) {
      this.showCalendar = !this.showCalendar;
    }
  }

  onSelectDate(date: string) {
    this.value = date;
    this.showCalendar = false;
  }

  ngOnInit() {

    this.unRegisterGlobalClick = this.renderer.listenGlobal('body', 'click', (event: any) => {
      this.closeCalendarGlobal(event);
    });
    this.input.nativeElement.disabled=this.disable;
  }

  ngOnDestroy() {

    if (this.unRegisterGlobalClick) {
      this.unRegisterGlobalClick();
    }

  }

  onKeyDown(event: KeyboardEvent): void {

    if (event.key === 'Tab') {
      this.showCalendar = false;
    }
  }

  private closeCalendarGlobal(event: any) {

    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showCalendar = false;
    }

  }

  private onChange: (value: any) => void = () => null;


}
