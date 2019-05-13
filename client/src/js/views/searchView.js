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
                <li class="recipes__list--item">
                    <img class="recipes__list--item--img" src=${
                      recipe.recipe.image
                    } alt="Recipes">
                    <div>
                      <h2 class="recipes__list--item--label">${
                        recipe.recipe.label
                      }</h2>
                      <h4 class="recipes__list--item--pub">Published by: ${
                        recipe.recipe.source
                      }</h4>
                    </div>
                </li>
            `;

  el.searchResList.insertAdjacentHTML("beforeend", html);
};

const createButton = (page, type) => {
  let btnHtml;
  if (type === "PREV") {
    btnHtml = `
            <button class="recipes__pagination--btn prev" data-pagenum=${page -
              1}>
              <i class="far fa-arrow-alt-circle-left"></i> ${type}
            </button>
        `;
  } else if (type === "NEXT") {
    btnHtml = `
            <button class="recipes__pagination--btn next" data-pagenum=${page +
              1}>${type} <i class="far fa-arrow-alt-circle-right"></i> 
            </button>
        `;
  }

  return btnHtml;
};

const paginationBtns = (page, numRes, numPerPage) => {
  const pages = Math.ceil(numRes / numPerPage);
  let button;
  if (page === 1 && pages > 1) {
    //NEXT button
    button = createButton(page, "NEXT");
  } else if (page < pages) {
    //BOTH buttons
    button = `
            ${createButton(page, "PREV")}
            ${createButton(page, "NEXT")}
          `;
  } else if (page === pages && pages > 1) {
    //PREV button
    button = createButton(page, "PREV");
  }
  el.paginationBtns.insertAdjacentHTML("afterbegin", button);
};

export const renderRecipes = (recipes, page = 1, numPerPage = 10) => {
  const start = (page - 1) * numPerPage;
  const end = page * numPerPage;
  recipes.slice(start, end).forEach(displayRecipe);
  paginationBtns(page, recipes.length, numPerPage);
};

export const clearResults = () => {
  el.searchResList.innerHTML = "";
  el.paginationBtns.innerHTML = "";
};
