import icons from 'url:../../img/icons.svg'; // parcel 2;

class SearchView {
  #parentEl = document.querySelector('.search');
  #resultEl = document.querySelector('.results');

  getQuery() {
    const query= this.#parentEl.querySelector('.search__field').value;
    this.#clearInput();
    return query;
  }
  #clearInput() {
    this.#parentEl.querySelector('.search__field').value = '';
  }
  addHandlerSearch(handler) {
    this.#parentEl.addEventListener('submit', function(ev) {
      ev.preventDefault();
      handler();
    });
  }
  renderSearchResults(result) {
    const markup = `
    <li class="preview">
      <a class="preview__link preview__link--active" href="#23456">
        <figure class="preview__fig">
          <img src="${result.image}" alt="Test" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${result.title}</h4>
          <p class="preview__publisher">${result.publisher}</p>
          <div class="preview__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
        </div>
      </a>
    </li>
    `;
    this.#resultEl.insertAdjacentHTML('afterbegin', markup)
  }
}
// id: rec.id,
//   title: rec.title,
//   publisher: rec.publisher,
//   image: rec.image_url,
export default new SearchView();