import { elements as el } from "./base";

export const getInput = () => el.searchInput.value;

export const clearInput = () => {
  el.searchInput.value = "";
};

const displayRecipe = recipe => {
  //Render recipe to DOM
  const html = `
                <li>
                    <h4>${recipe.recipe.label}</h4>
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
