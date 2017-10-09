import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { DatePipe } from '@angular/common';
import { MyDatePickerModule } from 'mydatepicker';
import { MatDatepickerModule } from '@angular/material';

import { PeopleComponent } from './people.component';
import { PeopleService } from './shared/people.service';
import { PersonFormComponent } from './person-form/person-form.component';

import { PagerModule } from '../paging/pager.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpModule,
    PagerModule,
    MyDatePickerModule,
    MatDatepickerModule
  ],
  declarations: [
    PeopleComponent,
    PersonFormComponent
  ],
  exports: [
    PeopleComponent
  ],
  providers: [
    PeopleService
  ]
})
export class PeopleModule { }
