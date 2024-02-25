import view from './views/recipeView';
import { TIMEOUT_SECONDS } from './config';

export const getJSON = async function(url) {
   try {
      const res = await Promise.race([
        fetch(url),
        timeout(TIMEOUT_SECONDS),
      ])

      if (!res.ok) return;
      // {
      //    view.renderError();
      //    throw new Error(`Something happen => ${res.status} ${res.statusText}`);
      // }
      return res.json();
   } catch (err){
      throw err;
   }
}

const timeout = function(s) {
   return new Promise(function(_, reject) {
      setTimeout(function() {
         reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
   });
};
// Promise.race 이렇게 하면 안됨, res 받을 때 걸어야 함
/*    await Promise.race([
        timeout(0.0001),
        await model.loadRecipe(id),
      ]
    ).then(res => {
      recipe = model.state.recipe
    }).catch(err => console.log('from race error => ', err.message));

    // const {recipe} = model.state;
    console.log(recipe);*/
// const res = await fetch(
  // 단순 버젼
  // `https://forkify-api.herokuapp.com/api/v2/recipes?ssearch=${searchRecipe}&key=${key}`
  // 전체 내용
  // `https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key=${KEY}`
// 전체 레시피 검색은 api에서 막음