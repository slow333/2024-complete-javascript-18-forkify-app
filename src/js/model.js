import icons from 'url:../img/icons.svg'; // parcel 2;
import view from './views/recipeView'
export const state =  {
  recipe: {},
}
export const loadRecipe = async function(id) {
  try {
    const key = 'c6a71d97-f8c6-48cd-bc3d-6bdcc665f0c3';
    const key2 = '9081dcb5-6c8f-404e-a6ce-754cb231a490';
    const res = await fetch(
      // 단순 버젼
      // `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchRecipe}&key=${key}`
      // 전체 내용
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key=${key}`
      // 전체 레시피 검색은 api에서 막음
    );
    if (!res.ok) {
      view.renderError();
      throw new Error(`Something happen => ${res.status} ${res.statusText}`);
    }
    const data = await res.json();

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
    console.log(err);
  }
}