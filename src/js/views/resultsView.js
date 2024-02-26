import icons from 'url:../../img/icons.svg';
import View from './View'; // parcel 2;

class ResultsView extends View {
  _parentEl = document.querySelector('.results');
  _query = document.querySelector('.search__field');

  _errorMessage = '찾는 레시피가 없습니다. 다시해봐요.🤩🤩🤩';
  _message = '좋아하는 레시피를 찾아 보세요.  🤣🤣🤣';

  getQuery() {
    const query = this._query.value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._query.value = '';
  }
  _generateMarkup() {
    console.log(this._data);
    return this._data.map(this._generatePreviewHtml).join('')
  }
  _generatePreviewHtml(result) {
    return `
    <li class="preview">
      <a class="preview__link" href="#${result.id}">
        <figure class="preview__fig">
          <img src="${result.image}" alt="Test" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${result.title}</h4>
          <p class="preview__publisher">${result.publisher}</p>
        </div>
      </a>
    </li>
    `
  }
}

export default new ResultsView();