import icons from 'url:../../img/icons.svg';// parcel 2;
import View from './View';

class BookmarksView extends View {
  _parentEl = document.querySelector('.bookmarks__list');

  _errorMessage = '찾는 레시피가 없습니다. 다시해봐요.🤩🤩🤩';
  _message = '좋아하는 레시피를 찾아 보세요.  🤣🤣🤣';

  addHandlerRender(handler) {
    window.addEventListener('load', handler)
  }

  _generateMarkup() {
    // console.log(this._data);
    return this._data.map(this._generatePreviewHtml).join('')
  }
  _generatePreviewHtml(result) {
    const id = window.location.hash.slice(1);

    return `
    <li class="preview">
      <a class="preview__link ${result.id === id ? 'preview__link--active' : ''}" href="#${result.id}">
        <figure class="preview__fig">
          <img src="${result.image}" alt="Test" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${result.title}</h4>
          <p class="preview__publisher">${result.publisher}</p>
          <div class="recipe__user-generated ${result.key ? '' : 'hidden'}">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
        </div>
        
      </a>
    </li>
    `;
  }
}

export default new BookmarksView();