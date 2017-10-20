import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { DatePipe } from '@angular/common';
import { MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material';
import { DateAdapter, NativeDateAdapter } from '@angular/material';

import { PeopleComponent } from './people.component';
import { PeopleService } from './shared/people.service';
import { PersonFormComponent } from './person-form/person-form.component';
// import { ControlMessagesComponent } from '../control/control-message.component';

import { PagerModule } from '../paging/pager.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpModule,
    PagerModule,
    // MyDatePickerModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [
    PeopleComponent,
    PersonFormComponent,
    // ControlMessagesComponent
  ],
  exports: [
    PeopleComponent
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    PeopleService
  ]
})
export class PeopleModule { }
