import icons from 'url:../../img/icons.svg'; // parcel 2;

export default class View {
  _data;

  render(data) {
    if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  // 뭔소린지 잘모르겠습니다. 필요한 요소만 업데이트 하는 방식
  update(data) {
    // if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentEl.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, curEl.isEqualNode(newEl));
      // updates changed TEXT
      if (!newEl.isEqualNode(curEl) && newEl.firstChild.nodeValue.trim() !== '') {
        // console.log('💥💥💥💥', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
        curEl.setAttribute(attr.name, attr.value))
      }
    })
  }
  _clear() {
    this._parentEl.innerHTML = '';
  }
  renderSpinner() {
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', this._spinnerMarkup())
  };

  renderError(message = this._errorMessage) {
    const markup = `
       <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  _spinnerMarkup = function() {
    return `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `
  };

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

}