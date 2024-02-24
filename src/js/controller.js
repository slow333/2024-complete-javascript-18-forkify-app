import * as model from './model';
import view from './views/recipeView';

import 'core-js/stable'; // 다양한 폴리필을 제공
import 'regenerator-runtime/runtime'

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

const showRecipe = async function() {
  try {
    // 1) loading recipe
    const id = window.location.hash.slice(1);
    console.log(id);
    if(!id) return;

    view.renderSpinner()

    let recipe;
    await Promise.race([
        timeout(0.0001),
        await model.loadRecipe(id),
      ]
    ).then(res => {
      recipe = model.state.recipe
    }).catch(err => console.log('from race error => ', err.message));

    // const {recipe} = model.state;
    console.log(recipe);

    // 2) render recipe
    view.render();

  } catch (e) {
    console.log(e);
  }
};

['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe))
// window.addEventListener('hashchange', showRecipe);