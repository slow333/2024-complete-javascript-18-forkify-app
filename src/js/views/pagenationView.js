import icons from 'url:../../img/icons.svg';
import View from './View'; // parcel 2;

class PagenationView extends View {

  _parentEl = document.querySelector('.pagination');
   _generateMarkup() {
     const numPages = Math.ceil(this._data.results.length / this._data.resultPerPage);
     const curPage = this._data.page;
    // Page 1, 더 있음
     if (curPage === 1 && numPages > 1) {
       return `${this._nextBtn()}
       `;
     }

    // 마지막
     if (curPage === numPages && numPages > 1) {
       return `
         <button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage -1 }</span>
         </button>
       `;
     }

    // 그외
     if (curPage < numPages) {
       return `
         <button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage -1 }</span>
         </button>
         <button class="btn--inline pagination__btn--next">
           <span>Page ${curPage + 1 }</span>
           <svg class="search__icon">
             <use href="${icons}#icon-arrow-right"></use>
           </svg>
         </button>
       `
     }
    // page 1, 이게 끝
     return  ''
  }
  _nextBtn() {
     return `
      <button class="btn--inline pagination__btn--next">
       <span>Page ${curPage + 1 }</span>
       <svg class="search__icon">
         <use href="${icons}#icon-arrow-right"></use>
       </svg>
     </button>
     `;
  }
  _preBtn() {
     return `
        <button class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage -1 }</span>
       </button>
     `;
  }
}

export default new PagenationView();