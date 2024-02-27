import icons from 'url:../../img/icons.svg';// parcel 2;
import View from './View';

class PagenationView extends View {

  _parentEl = document.querySelector('.pagination');
  curPage;
   _generateMarkup() {
     const numPages = Math.ceil(this._data.results.length / this._data.resultPerPage);
     this.curPage = this._data.page;
    // Page 1, 더 있음
     if (this.curPage === 1 && numPages > 1)
       return `${this._nextBtn()}`;

    // 마지막
     if (this.curPage === numPages && numPages > 1)
       return `${this._preBtn()}`;

    // 그외
     if (this.curPage < numPages)
       return `${this._nextBtn()} ${this._preBtn()}`;
    // page 1, 이게 끝
     return  '';
  }

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function(ev) {
      const btn = ev.target.closest('.btn--inline');
      if(!btn) return;
      const page = +btn.dataset.page;
      if(!page) return;
      handler(page);
    });
  }
  _nextBtn() {
     return `
      <button data-page ="${this.curPage + 1 }"  class="btn--inline pagination__btn--next">
       <span>Page ${this.curPage + 1 }</span>
       <svg class="search__icon">
         <use href="${icons}#icon-arrow-right"></use>
       </svg>
     </button>
     `;
  }
  _preBtn() {
     return `
        <button data-page ="${this.curPage - 1 }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${this.curPage -1 }</span>
       </button>
     `;
  }
}

export default new PagenationView();