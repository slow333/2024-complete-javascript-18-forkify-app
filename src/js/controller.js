import * as model from './model';
import recipeView from './views/recipeView';
import resultsView from './views/resultsView';

import 'core-js/stable'; // 다양한 폴리필을 제공
import 'regenerator-runtime/runtime';
import searchView from './views/searchView';
import pagenationView from './views/pagenationView';

if (module.hot) {
  module.hot.accept()
}
const controlRecipes = async function() {
  try {
    // 1) loading recipe
    const id = window.location.hash.slice(1);
    // console.log(id);
    if (!id) return;

    // 2) load recipe
    recipeView.renderSpinner();

    await model.loadRecipe(id);

    // 3) render recipe
    recipeView.render(model.state.recipe);

  } catch (err) {
    recipeView.renderError()
  }
};

const controlSearchResults = async function() {
  try{
    // 1. get search query
    resultsView.renderSpinner();
    const query = resultsView.getQuery();
    if(!query) return;

    // 2. load search results
    await model.loadSearchResults(query);

    // 3. render results
    resultsView.render(model.getSearchResultsPage(3));

    // 4. 초기 버튼 정하기
    pagenationView.render(model.state.searchResult)

  } catch (err) {
    console.log(err);
  }
}

const init = function() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults)
};
init();
