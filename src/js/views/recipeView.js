import icons from '../../img/icons.svg'; // parcel 1;
import * as model from '../model';

class RecipeView {
  #parentEl = document.querySelector('.recipe');

  render() {
    const markup = this.#recipeMarkup();
    this.#parentEl.innerHTML = '';
    this.#parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    this.#parentEl.innerHTML = '';
    this.#parentEl.insertAdjacentHTML('afterbegin', this.#spinnerMarkup())
  };
  renderError() {
    this.#parentEl.insertAdjacentHTML('afterbegin', this.#errorMarkup());
    document.querySelector('.spinner').remove();
    // window.location.reload();
  }

  #spinnerMarkup = function() {
    return `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `
  };
  #errorMarkup = function() {
    return `
       <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>No recipes found for your query. Please try again!</p>
      </div>
    `
  };
  #recipeMarkup = function() {
    return `
    <figure class="recipe__fig">
      <img src="${model.state.recipe.image}" alt="${model.state.recipe.title}" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${model.state.recipe.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${model.state.recipe.cookingTime}</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${model.state.recipe.servings}</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
          <button class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button class="btn--tiny btn--increase-servings">
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
      <button class="btn--round">
        <svg class="">
          <use href="${icons}#icon-bookmark-fill"></use>
        </svg>
      </button>
    </div>
      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">

        ${model.state.recipe.ingredients.map(ing => { // map은 새로운 array를 주니까 join해야함
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
        This model.state.recipe was carefully designed and tested by
        <span class="recipe__publisher">${model.state.recipe.publisher}</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${model.state.recipe.sourceUrl}"
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