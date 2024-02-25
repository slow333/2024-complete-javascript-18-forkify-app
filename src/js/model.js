import {API_URL, KEY, KEY2 } from './config';
import {getJSON} from './helper';

export const state =  {
  recipe: {},
  searchResult : {
    query: '',
    results: []
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
export const loadSearchResult = async function(query){
  try {
    state.searchResult.query = query
    const data = await getJSON(`${API_URL}?search=${query}&key=${KEY}`);
    // https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza&key=<insert your key>
   state.searchResult.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      }
    })
  } catch (err) {
    throw err;
  }
}