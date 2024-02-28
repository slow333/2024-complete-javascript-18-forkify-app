import * as model from './model';
import recipeView from './views/recipeView';
import resultsView from './views/resultsView';

import 'core-js/stable'; // 다양한 폴리필을 제공
import 'regenerator-runtime/runtime';
import searchView from './views/searchView';
import pagenationView from './views/pagenationView';
import { getSearchResultsPage, loadRecipe, state } from './model';
import bookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView';

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
    bookmarksView.update(model.state.bookmarks);

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
  if(!model.state.recipe.bookmarked)
    model.addBookmark(model.state.recipe);
  else
    model.deleteBookmark(model.state.recipe.id);

  // console.log(model.state.bookmarks);
  // console.log('선택한 레시피 => ', model.state.recipe);

  recipeView.update( model.state.recipe );
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function() {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async (newRecipe) => {
  try {
    // show spinner
    addRecipeView.renderSpinner();
    // upload recipe
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // render uploaded recipe
    recipeView.render(model.state.recipe);

    // render success message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks)

    // Change ID url
    window.history.pushState(null, '', `#${model.state.recipe.id}`)

    setTimeout(function() {
      // close window form
      addRecipeView.toggleWindow();
    }, 2000);
  } catch (err) {
    console.error('💥💥💥', err);
    addRecipeView.renderError(err.message);
  }
};

const init = function() {
  bookmarksView.addHandlerRender(controlBookmarks)
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);

  searchView.addHandlerSearch(controlSearchResults);
  pagenationView.addHandlerClick(controlPagenation);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
