import { elements as el } from "./base";

export const getInput = () => el.searchInput.value;

export const clearInput = () => {
  el.searchInput.value = "";
};

const displayRecipe = (recipe, recipes) => {
  //Render recipe to DOM
  const html = `
                <li class="recipes__list--item" data-id=${recipes.indexOf(
                  recipe
                )}>
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
  let button = "";
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
  if (button === "" && numRes <= 0) {
    button = `<div class="noResults">Sorry, your search produced no results. Try again.</div>`;
  }
  el.paginationBtns.insertAdjacentHTML("afterbegin", button);
};

export const renderRecipes = (recipes, page = 1, numPerPage = 10) => {
  const start = (page - 1) * numPerPage;
  const end = page * numPerPage;
  recipes.slice(start, end).forEach(recipe => displayRecipe(recipe, recipes));
  paginationBtns(page, recipes.length, numPerPage);
};

const getNutritionalInfo = info => {
  let nutritionalArray = [];
  info.forEach(fact => {
    let html = `
              <div class="nutrition__flex nutrition__bottom-border">
                <p>${fact.label} ${Math.floor(fact.total)}${fact.unit}</p>
                <p>${Math.floor(fact.daily)}%</p>
              </div>
              `;
    nutritionalArray.push(html);
  });
  nutritionalArray.push(`
  <div class="black_spacer_large"></div>`);
  return nutritionalArray.join("");
};

export const renderRecipe = recipe => {
  console.log(recipe);
  const html = `
            <div class="recipe">
              <div class="recipe__top">
                <img class="recipe__top--img" src=${
                  recipe.img
                } alt="recipe image" />
                <div class="recipe__top--info">
                  <h2 class="recipe__top--info-title">${recipe.title}</h2>
                  <h4 class="recipe__top--info-author">${recipe.author}</h4>
                  <p class="recipe__top--info-servings"><i class="fas fa-utensils"></i> Serves: ${
                    recipe.servings
                  }</p>
                  <p class="recipe__top--info-calPer"><i class="fas fa-fire"></i> Calories per serving: ${
                    recipe.servings > 1
                      ? Math.floor(recipe.cal / recipe.servings)
                      : "N/A"
                  }</p>

                </div>
              </div>
              <div class="recipe__bottom">
                  <div class="nutrition">
                    <p class="nutrition__title">Nutrition Facts</p>
                    <p class="nutrition__info>Serving Size 1</p>
                    <p class="nutrition__info>Servings Per Recipe ${
                      recipe.servings
                    }</p>
                    <div class="black_spacer_large"></div>
                    <p class="nutrition__info nutrition__bottom-border">Amount Per Serving</p>
                    <div class="nutrition__flex">
                      <p>Calories ${
                        recipe.servings > 1
                          ? Math.floor(recipe.cal / recipe.servings)
                          : "N/A"
                      }</p>
                      <p> </p>
                    </div>
                    <div class="black_spacer_normal"></div>
                    <div class="nutrition__flex">
                      <p></p>
                      <p>%Daily Value*</p>
                    </div>
                      ${getNutritionalInfo(recipe.nutrition)}
                    <p class="nutrition__info">*Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be highter or lower depending on your calorie needs.</p>
                </div>
              </div>
            </div>
  `;
  el.recipePage.innerHTML = html;
};

export const addActive = node => {
  node.classList.add("active");
};

export const removeActive = () => {
  let x = el.searchResList.childNodes;
  for (let y of x) {
    if (y.classList) {
      y.classList.remove("active");
    }
  }
};

export const clearRecipe = () => {
  el.recipePage.innerHTML = "";
};

export const clearResults = () => {
  el.searchResList.innerHTML = "";
  el.paginationBtns.innerHTML = "";
};
