import { Component, OnInit, Input } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/operator/map';
import { PagerService } from './service/pager.service';

@Component({
  moduleId: module.id,
  selector: 'pager',
  templateUrl: 'pager.component.html'
})

export class Pager implements OnInit {
  constructor(private http: Http, private pagerService: PagerService) { }

  totalItemsInternal: number = 0;
  currentPageInternal: number = 1;

  @Input() set totalItems(totalItems: number) {
    if (totalItems) {
      // console.log('totalItems->' + totalItems);
      this.totalItemsInternal = totalItems;
      this.setPage(1);
    }
  }
  @Input() set currentPage(currentPage: number) {
    if (currentPage) {
      // console.log('currentPage->' + currentPage);
      this.currentPageInternal = currentPage;
      this.setPage(1);
    }
  }
  // array of all items to be paged
  // private allItems: any[];

  // pager object
  pager: any = {};

  // paged items
  // pagedItems: any[];

  ngOnInit() {
    //this.setPage(1);
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      // console.log('page coisa');
      return;
    }

    // console.log('page otra');
    // get pager object from service
    this.pager = this.pagerService.getPager(this.totalItemsInternal, this.currentPageInternal);

    // get current page of items
    // this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
