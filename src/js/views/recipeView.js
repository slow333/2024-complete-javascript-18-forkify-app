// import icons from '../../img/icons.svg'; // parcel 1;
import View from './View.js';

import icons from 'url:../../img/icons.svg'; // parcel 2;

class RecipeView extends View{
  _parentEl = document.querySelector('.recipe');
  _errorMessage = '찾는 레시피가 없습니다. 다시해봐요.🤩🤩🤩';
  _message = '좋아하는 레시피를 찾아 보세요.  🤣🤣🤣';
  _recipeInfoBtn = document.querySelector('.recipe__info-buttons')

  addHandlerRender(handler){
    ['hashchange', 'load']
      .forEach(ev => window.addEventListener(ev, handler));
  }

  addHandlerUpdateServings(handler) {
    this._parentEl.addEventListener('click', function(ev) {
      const btn = ev.target.closest('.btn--tiny');
      if(!btn) return;
      const { updateServings } = btn.dataset;
      if(+updateServings > 0) handler(+updateServings);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentEl.addEventListener('click', function(ev) {
      const btn = ev.target.closest('.btn--bookmark');
      if(!btn) return;
      handler();
    });
  }

  _generateMarkup() {
    const recipe = this._data;
    return `
    <figure class="recipe__fig">
      <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${recipe.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingTime}</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
          <button data-update-servings="${recipe.servings -1}" class="btn--tiny btn--decrease-servings">
            <svg>
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button data-update-servings="${recipe.servings +1}" class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>

      <div class="recipe__user-generated">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
      </div>
      <button class="btn--round btn--bookmark">
        <svg class="">
          <use href="${icons}#icon-bookmark${this._data.bookmarked ? '-fill': ''}"></use>
        </svg>
      </button>
    </div>
      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">

        ${recipe.ingredients.map(ing => { // map은 새로운 array를 주니까 join해야함
          return `
            <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${ing.quantity}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
              </div>
            </li>      
          `;
          }).join('')}
         </ul>
      </div>           

    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${recipe.sourceUrl}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>
    `;
  };
}

export default new RecipeView();