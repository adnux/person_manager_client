import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Pager } from './pager.component';
import { PagerService } from './service/pager.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    Pager
  ],
  exports: [
    Pager
  ],
  providers: [
    PagerService
  ]
})
export class PagerModule { }
