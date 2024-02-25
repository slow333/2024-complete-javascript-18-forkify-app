import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';

import 'core-js/stable'; // 다양한 폴리필을 제공
import 'regenerator-runtime/runtime';
import { getJSON } from './helper';
import { API_URL, KEY,KEY2 } from './config';

const controlRecipes = async function() {
  try {
    // 1) loading recipe
    const id = window.location.hash.slice(1);
    console.log(id);
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
    const query = searchView.getQuery();
    if(!query) return;

    // 2. load search results
    await model.loadSearchResult(query)

    // 3. render results
    // console.log(model.state.searchResult.results);
    model.state.searchResult.results.forEach(result => {
      searchView.renderSearchResults(result)
    })

  } catch (err) {
    console.log(err);
  }
}

const init = function() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults)
};
init();