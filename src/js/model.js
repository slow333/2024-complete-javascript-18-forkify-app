import {API_URL, KEY, KEY2, RES_PER_PAGE } from './config';
// import {getJSON, setJSON} from './helper';
import {AJAX} from './helper';

export const state =  {
  recipe: {},
  searchResult : {
    query: '',
    results: [],
    page: 1,
    resultPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
}

const createRecipeObject = function(data) {
  const {recipe} = data.data
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  }
};

export const loadRecipe = async function(id) {
  try {
    const data = await AJAX(`${API_URL}/${id}?key=${KEY}`)

    state.recipe = createRecipeObject(data);

    if(state.bookmarks.some(b => b.id === id))
      state.recipe.bookmarked = true;
    else
      state.recipe.bookmarked = false;
  } catch (err) {
    console.error('모델에서 발생한 애러 ==> ', err);
    throw err;
  }
}
export const loadSearchResults = async function(query){
  try {
    state.searchResult.query = query
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    state.searchResult.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
      }
    });
    state.searchResult.page = 1;
  } catch (err) {
    throw err;
  }
}

export const getSearchResultsPage = function(page = state.searchResult.page) {
  state.searchResult.page = page;
  const start  = (page - 1) * state.searchResult.resultPerPage; //0;
  const end = page * state.searchResult.resultPerPage; //9;
  return state.searchResult.results.slice(start, end);
};

export const updateServings = function(newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings
  });
  state.recipe.servings = newServings
};

const storeLocalstorage = function() {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function(recipe) {
  // add bookmark
  state.bookmarks.push(recipe);
  // Mark current recipe as bookmark
  if(recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  storeLocalstorage();
};

export const deleteBookmark = function(id) {
  const index = state.bookmarks.findIndex(value => value.id === id);
  state.bookmarks.splice(index, 1);
  if(id === state.recipe.id) state.recipe.bookmarked = false;
  storeLocalstorage();
};

const init = function() {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

export const uploadRecipe = async function(newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry =>
        entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());
        // const ingArr = ing[1].replaceAll(' ', '').split(',');
        if (ingArr.length !== 3) throw new Error('형식에 맞추어야 해요:');

        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    }
    console.log('from model => ', recipe);
    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
}