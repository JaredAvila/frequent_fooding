import "../sass/main.scss";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import * as listView from "./views/listView";
import {
  elements as el,
  loadingSpinner as spinner,
  clearSpinner,
  displayFooter
} from "./views/base";
import Search from "./models/Search";
import Recipe from "./models/Recipe";
import List from "./models/List";

// Global State
const state = {};

//TESTING
window.state = state;

// Search Controller

const search = async () => {
  // 1. Get input from view
  const search = searchView.getInput();
  if (search) {
    // 2. Create new Search obj
    state.search = new Search(search);
    // 3. Perpare UI to recieve results
    searchView.clearInput();
    searchView.clearResults();
    spinner(el.searchResList);
    // 4. Search for recipes
    try {
      await state.search.getRecipes();
      // 5. Render results in UI
      searchView.renderRecipes(state.search.recipes);
    } catch (error) {
      console.log(error);
    }
    clearSpinner();
  }
};

el.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  search();
});

el.paginationBtns.addEventListener("click", e => {
  const btn = e.target.closest(".recipes__pagination--btn");
  if (btn) {
    const nextPage = parseInt(btn.dataset.pagenum);
    searchView.clearResults();
    searchView.renderRecipes(state.search.recipes, nextPage);
  }
});

// Recipe Controller

recipeView.noRecipe();

el.searchResList.addEventListener("click", e => {
  const recipe = e.target.closest(".recipes__list--item");
  if (recipe) {
    //get recipe ID
    const id = parseInt(recipe.dataset.id);
    //create new recipe
    state.curRecipe = new Recipe(state.search.recipes[id].recipe);
    //prepare UI for recipe
    recipeView.clearRecipe();
    recipeView.renderRecipe(state.curRecipe);
    searchView.addActive(recipe);
    //scroll back to top
    window.scrollTo(0, 0);
  }
});

// List Controller
el.ingredientsList.addEventListener("click", e => {
  // Get list string
  const listITem = e.target.closest(".ingList__item").innerHTML;
  // Add new item to Shopping List
  if (!state.list) state.list = new List();
  const newItem = state.list.addItem(listITem);
  // Update UI
  listView.addListItem(newItem);
});
displayFooter();
