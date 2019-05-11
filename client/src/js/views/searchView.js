import { elements as el } from "./base";

export const getInput = () => el.searchInput.value;

export const clearInput = () => {
  el.searchInput.value = "";
};

const displayRecipe = recipe => {
  //Render recipe to DOM
  let calPerServing;
  if (recipe.recipe.yield <= 1) {
    calPerServing = "N/A";
  } else {
    calPerServing = Math.floor(recipe.recipe.calories / recipe.recipe.yield);
  }
  const html = `
                <li>
                    <img src=${recipe.recipe.image} alt="Recipes">
                    <div>
                    <h2>${recipe.recipe.label}</h2>
                    <h4>Published by: ${recipe.recipe.source}</h4>
                    <p>Servings: ${
                      recipe.recipe.yield
                    } | Calories per serving: ${calPerServing} | Total Calories: ${Math.floor(
    recipe.recipe.calories
  )}</p>
                    </div>
                    
                </li>
            `;

  el.searchResList.insertAdjacentHTML("beforeend", html);
};
export const renderRecipes = recipes => {
  recipes.forEach(displayRecipe);
};

export const clearResults = () => {
  el.searchResList.innerHTML = "";
};
