import { TestBed, async, inject } from '@angular/core/testing';
import { PagerService } from './pager.service';

fdescribe('Service: PagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PagerService]
    });
  });

  it('should ...', inject([PagerService], (service: PagerService) => {
    expect(service).toBeTruthy();
  }));

  it('return a range array', () => {
    let expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let range = new PagerService().range(1, 10);
    expect(expected).toEqual(range);
  });

  it('return a pager', () => {
    let pager = {
      totalItems: 15,
      currentPage: 1,
      pageSize: 5,
      totalPages: 3,
      startPage: 1,
      endPage: 3,
      startIndex: 0,
      endIndex: 4,
      pages: [1, 2, 3, 4]
    };
    let expected = new PagerService().getPager(15, 1, 5);

    expect(expected).toEqual(pager);
  });

});
