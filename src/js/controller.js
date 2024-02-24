// import icons from '../img/icons.svg'; // parcel 1;
import icons from 'url:../img/icons.svg'; // parcel 2;
import 'core-js/stable'; // 다양한 폴리필을 제공
import 'regenerator-runtime/runtime'

const recipeContainer = document.querySelector('.recipe');

const timeout = function(s) {
  return new Promise(function(_, reject) {
    setTimeout(function() {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
//GET: Returns a single recipe
// DELETE: Deletes a single recipe associated with provided API key
// Path:https://forkify-api.herokuapp.com/api/v2/recipes/:id
const key = 'c6a71d97-f8c6-48cd-bc3d-6bdcc665f0c3';
const key2 = '9081dcb5-6c8f-404e-a6ce-754cb231a490';

const renderSpinner = function(parentEl) {
  const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
  `;
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markup)
};

const showRecipe = async function() {
  try {
    // 1) loading recipe
    renderSpinner(recipeContainer)
    let searchRecipe = 'pizza';
    let searchId = '5ed6604591c37cdc054bcfcc';

    const res = await fetch(
      // 단순 버젼
      // `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchRecipe}&key=${key}`
      // 전체 내용
      `https://forkify-api.herokuapp.com/api/v2/recipes/${searchId}?key=${key}`
      // 전체 레시피 검색은 api에서 막음
    );
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} : ${res.status}`);

    console.log(data);

    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients
    };
    // 2) render recipe
    const markup = `
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
    recipeContainer.innerHTML = '';
    recipeContainer.insertAdjacentHTML('afterbegin', markup);
    console.log(recipe);
  } catch (e) {
    console.log(e);
  }
};
showRecipe();