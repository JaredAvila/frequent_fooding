import "../sass/main.scss";
import * as searchView from "./views/searchView";
import { elements as el } from "./views/base";
import Search from "./models/Search";

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
    // 4. Search for recipes
    await state.search.getRecipes();
    // 5. Render results in UI
    searchView.renderRecipes(state.search.recipes);
    console.log(state.search.recipes);
  }
};

el.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  search();
});

//https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free
