import "../sass/main.scss";
import * as searchView from "./views/searchView";
import {
  elements as el,
  loadingSpinner as spinner,
  clearSpinner,
  displayFooter
} from "./views/base";
import Search from "./models/Search";
import Recipe from "./models/Recipe";

// Global State
const state = {};

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

el.searchResList.addEventListener("click", e => {
  const recipe = e.target.closest(".recipes__list--item");
  if (recipe) {
    //get recipe ID
    const id = parseInt(recipe.dataset.id);
    //create new recipe
    state.curRecipe = new Recipe(state.search.recipes[id].recipe);
    //prepare UI for recipe
    searchView.clearRecipe();
    searchView.renderRecipe(state.curRecipe);
    searchView.removeActive();
    searchView.addActive(recipe);
    //scroll back to top
    window.scrollTo(0, 0);
  }
});

displayFooter();
