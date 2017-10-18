export class PagerService {
  getPager = (totalElements: number, pageNumber: number = 1, pageSize: number = 5) => {

    // calculate total pages

    const totalPages = Math.ceil(totalElements / pageSize);

    let startPage: number, endPage: number;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (pageNumber <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (pageNumber + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = pageNumber - 5;
        endPage = pageNumber + 4;
      }
    }

    // calculate start and end item indexes
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalElements - 1);

    // create an array of pages to ng-repeat in the pager control
    // let pages = _.range(startPage, endPage + 1);
    const pages = this.range(startPage, endPage);

    // return object with all pager properties required by the view
    return {
      totalElements: totalElements,
      pageNumber: pageNumber,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

  range = (start, totalElements) => {
    return Array.apply(0, Array(totalElements))
      .map((element, index) => index + start);
  }
}
