import icons from 'url:../../img/icons.svg';
import View from './View'; // parcel 2;

class PagenationView extends View {

  _parentEl = document.querySelector('.pagination');

  _curPage;
  _generateMarkup() {
    this._curPage = this._data.page;
    const numPages = Math.ceil(this._data.results.length / this._data.resultPerPage);
    // Page 1, 더 있음
    if (this._curPage === 1 && numPages > 1) {
      return `${this._nextMarkup()}`;
    }

    // 마지막
    if (this._curPage === numPages && numPages > 1) {
      return `${this._preMarkup()}`;
    }

    // 그외
    if (this._curPage < numPages) {
      return `${this._nextMarkup()} ${this._preMarkup()} `;
    }
    // page 1, 이게 끝
    return '';
  }

  _nextMarkup() {
    return `
      <button data-goto="${this._curPage + 1}" class="btn--inline pagination__btn--next">
       <span>Page ${this._curPage + 1}</span>
       <svg class="search__icon">
         <use href="${icons}#icon-arrow-right"></use>
       </svg>
     </button>
     `;
  }

  _preMarkup() {
    return `
       <button data-goto="${this._curPage - 1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${this._curPage - 1}</span>
       </button>
     `;
  }

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function(ev) {
        ev.preventDefault();
      const btn = ev.target.closest('.btn--inline');
      if (!btn)  return;

      const goToPage = +btn.dataset.goto;
      if(!goToPage) return;

      handler(goToPage);
    });
  }
}

export default new PagenationView();