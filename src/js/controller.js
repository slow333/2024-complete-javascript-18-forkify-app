import * as model from './model';
import recipeView from './views/recipeView';
import resultsView from './views/resultsView';

import 'core-js/stable'; // 다양한 폴리필을 제공
import 'regenerator-runtime/runtime';
import searchView from './views/searchView';
import pagenationView from './views/pagenationView';
import { getSearchResultsPage } from './model';

if (module.hot) {
  module.hot.accept()
}
const controlRecipes = async function() {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);
    if (!id) return;
    recipeView.renderSpinner();

    // 0. update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage())

    // 1) loading recipe
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
    resultsView.render(model.getSearchResultsPage());

    // 4. 초기 버튼 정하기
    pagenationView.render(model.state.searchResult)

  } catch (err) {
    console.log(err);
  }
}
const controlPagenation = function(page) {
  // 1. render NEW results
  resultsView.render(model.getSearchResultsPage(page));

  // 2. NEW 버튼 정하기
  pagenationView.render(model.state.searchResult)
};
const controlServings = function(newServings) {
  // 1) state에 있는 값을 변경
  model.updateServings(newServings);
  // 2) render recipe
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
  // recipe 화면을 업데이트
};

const controlAddBookmark = function() {
  model.addBookmark(model.state.recipe);
  console.log('선택한 레시피 => ', model.state.recipe);
  recipeView.update(model.state.recipe)
};
const init = function() {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);

  searchView.addHandlerSearch(controlSearchResults);
  pagenationView.addHandlerClick(controlPagenation);
};
init();
