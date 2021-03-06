import "../sass/main.scss";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import * as listView from "./views/listView";
import * as likesView from "./views/likesView";
import {
  elements as el,
  loadingSpinner as spinner,
  clearSpinner,
  displayFooter
} from "./views/base";
import Search from "./models/Search";
import Recipe from "./models/Recipe";
import List from "./models/List";
import Likes from "./models/Likes";

// Global State
const state = {};
state.list = new List();
state.likes = new Likes();

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
    spinner(el.recipeList);
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

el.recipeList.addEventListener("click", e => {
  const recipe = e.target.closest(".recipes__list--item");
  if (recipe) {
    //get recipe ID
    const id = parseInt(recipe.dataset.id);
    //create new recipe
    state.curRecipe = new Recipe(state.search.recipes[id].recipe);
    //prepare UI for recipe
    recipeView.clearRecipe();
    recipeView.renderRecipe(state.curRecipe, state.list.list, state.likes);
    searchView.addActive(recipe);
    //scroll back to top
    window.scrollTo(0, 0);
  }
});

const checkTheList = listItem => {
  let type = true;
  let id;
  state.list.list.forEach(item => {
    if (item.item === listItem) {
      //remove item
      type = false;
      id = item.id;
    }
  });

  if (type) {
    // Add new item to Shopping List
    const newItem = state.list.addItem(listItem);
    // Update UI
    listView.addListItem(newItem);
    // toggle button
    return recipeView.createIng(newItem.item, state.list.list);
    // **************add to Likes list
  } else if (!type) {
    //remove list item
    listView.deleteItem(id);
    let markup = recipeView.removeIng(listItem, state.list.list);
    state.list.removeItem(id);
    return markup;
  }
};

// Ingredients/Likes Controller
el.recipe.addEventListener("click", e => {
  // ********Add to shopping list
  const classArr = Array.from(e.target.classList);
  // Get list string
  if (classArr.find(e => e === "ingredientTitle")) {
    const listITem = e.target.closest(".ingredientTitle").innerHTML;
    const markup = checkTheList(listITem);
    e.target.parentElement.innerHTML = markup;
  } else if (
    classArr.find(e => e === "fa-minus-circle") ||
    classArr.find(e => e === "fa-plus-circle")
  ) {
    // Add new item to Shopping List
    const listItem = e.target.parentElement.nextSibling.innerHTML;
    const markup = checkTheList(listItem);
    e.target.parentElement.parentElement.innerHTML = markup;
    // }
  } else if (e.target.closest(".like-btn")) {
    const button = likesView.toggleNavBtn(false);
    if (button) {
      el.likeListBtn.innerHTML = button;
    }
    el.likesListContainer.style.display = "none";
    // add/remove recipe
    if (
      state.likes.likes.findIndex(e => e.recipe.id === state.curRecipe.id) !==
      -1
    ) {
      // toggle button
      e.target.closest(".like-btn").innerHTML = likesView.toggleLikesBtn(true);
      // remove recipe from likes
      const like = state.likes.likes.findIndex(
        e => e.recipe.id === state.curRecipe.id
      );
      state.likes.removeLike(state.likes.likes[like]);
    } else if (
      state.likes.likes.findIndex(e => e.recipe.id === state.curRecipe.id) ===
      -1
    ) {
      state.likes.addLike(state.curRecipe);
      // UI: toggle likes button
      e.target.closest(".like-btn").innerHTML = likesView.toggleLikesBtn(false);
      // UI: update UI in navbar
    }
  }
});

// List Controller
el.shoppingList.addEventListener("click", e => {
  // Remove Item from list and update UI
  const id = e.target.closest(".listItem").dataset.itemid;
  const newList = listView.deleteListItem(
    id,
    state.list,
    state.curRecipe.ingredients
  );
  state.list = newList;
});

// Likes List Controller
el.likeListBtn.addEventListener("click", e => {
  let btn = false;
  el.likeListBtn.children[0].classList.forEach(className => {
    className === "fa-heart" ? (btn = true) : btn;
  });
  if (btn) {
    // ******** if likes btn = heart
    // render likes list
    const likesList = likesView.rednerLikesList(state.likes.likes);
    el.likesListUL.innerHTML = likesList;
    // show likes list
    el.likesListContainer.style.display = "block";
    // toggle likes btn
    const button = likesView.toggleNavBtn(btn);
    if (button) {
      el.likeListBtn.innerHTML = button;
    }
  }
});

el.likesListContainer.addEventListener("click", e => {
  const recipe = e.target.closest("li");
  state.likes.likes.forEach(like => {
    like.recipe.id === recipe.dataset.id
      ? (state.curRecipe = like.recipe)
      : state.curRecipe;
  });
  recipeView.renderRecipe(state.curRecipe, state.list.list, state.likes);
  searchView.addActiveLikes(state.curRecipe, state.search.recipes);
});

window.addEventListener("click", e => {
  let check = true;
  e.target.classList.forEach(className => {
    if (className === "fa-heart") {
      check = false;
    }
  });
  if (check) {
    const button = likesView.toggleNavBtn(false);
    if (button) {
      el.likeListBtn.innerHTML = button;
    }
    el.likesListContainer.style.display = "none";
  }
});

displayFooter();
