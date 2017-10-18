import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  SimpleChange
} from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { PagerService } from './service/pager.service';

@Component({
  moduleId: module.id,
  selector: 'app-pager',
  templateUrl: 'pager.component.html'
})

export class Pager implements OnInit, OnChanges {

  @Input() pageNumber: number; // the current page
  @Input() totalElements: number; // how many total items there are in all pages
  @Input() pageSize: number; // how many items we want to show per page

  @Output() goPage = new EventEmitter<number>();

  // pager object
  pager: any = {};

  constructor(private http: Http, private pagerService: PagerService) { }

  ngOnInit() {
    // console.log('starting pager')
    // this.setPage(1);
  }

  ngOnChanges(changes: SimpleChanges) {
    const pageNumber: SimpleChange = changes.pageNumber;
    const pageSize: SimpleChange = changes.pageSize;
    const totalElements: SimpleChange = changes.totalElements;
    if (pageNumber) {
      this.pageNumber = pageNumber.currentValue + 1;
    }
    if (pageSize) {
      this.pageSize = pageSize.currentValue;
    }
    if (totalElements) {
      this.totalElements = totalElements.currentValue;
    }
    // console.log('@new values=', this.totalElements, this.pageNumber, this.pageSize);
    this.pager = this.pagerService.getPager(this.totalElements, this.pageNumber, this.pageSize);

    // this._name = name.currentValue.toUpperCase();
  }

  setPage(pageNumber: number) {
    if (!pageNumber || pageNumber < 1 || pageNumber > this.pager.totalPages) {
      return;
    }
    this.pageNumber = pageNumber;
    // console.log('@old values=', this.totalElements, this.pageNumber, this.pageSize);
    // get pager object from service
    this.pager = this.pagerService.getPager(this.totalElements, this.pageNumber, this.pageSize);
    this.goPage.emit(pageNumber);
  }
}
