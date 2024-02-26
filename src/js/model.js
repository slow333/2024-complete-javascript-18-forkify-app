import {API_URL, KEY, KEY2, RES_PER_PAGE } from './config';
import {getJSON} from './helper';

export const state =  {
  recipe: {},
  searchResult : {
    query: '',
    results: [],
    page: 1,
    resultPerPage: RES_PER_PAGE,
  },
}
export const loadRecipe = async function(id) {
  try {
    const data = await getJSON(`${API_URL}/${id}?key=${KEY}`)

    let { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients
    };
  } catch (err) {
    console.error('모델에서 발생한 애러 ==> ', err);
    throw err;
  }
}
export const loadSearchResults = async function(query){
  try {
    state.searchResult.query = query
    const data = await getJSON(`${API_URL}?search=${query}&key=${KEY2}`);
    state.searchResult.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      }
    });
    console.log(data);
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