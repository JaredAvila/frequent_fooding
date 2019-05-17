import { elements as el } from "./base";

const getNutritionalInfo = (info, servings) => {
  //  loop through array, parse info and create array of HTML
  let nutritionalArray = [];
  info.forEach(fact => {
    let html = `
                <div class="nutrition__flex nutrition__bottom-border">
                  <p>${fact.label} ${Math.floor(fact.total / servings)}${
      fact.unit
    }</p>
                  <p>${Math.floor(fact.daily / servings)}%</p>
                </div>
                `;
    nutritionalArray.push(html);
  });
  nutritionalArray.push(`<div class="black_spacer_large"></div>`);
  // join array and return
  return nutritionalArray.join("");
};

export const getIngredientsArray = ingredients => {
  let ingArray = [];
  ingredients.forEach(el => ingArray.push(el));
  return ingArray;
};

const renderBtn = type => {
  if (type) {
    return `<span class="addToList remove"><i class="fas fa-minus-circle"></i> </span>`;
  } else {
    return `<span class="addToList add"><i class="fas fa-plus-circle"></i> </span>`;
  }
};

export const createIng = (ing, shopping_list) => {
  let type = false;
  shopping_list.forEach(item => {
    if (item.item === ing) {
      type = true;
    }
  });
  // get respective button
  const btn = renderBtn(type);
  return `${btn}<p class="ingredientTitle">${ing}</p>`;
};

const getIngredientsString = (ingredients, shopping_list) => {
  // loop through array and create array of HTML
  let ingrArray = [];
  ingredients.forEach(ing => {
    // check if item is on shopping list
    ingrArray.push(
      `<li class = "ingList__item">${createIng(ing, shopping_list)}</li>`
    );
  });
  // join array and return
  return ingrArray.join("");
};

export const renderRecipe = (recipe, shopping_list) => {
  const html = `
              <div class="recipe">
                <div class="recipe__top">
                  <img class="recipe__top--img" src=${
                    recipe.img
                  } alt="recipe image" />
                  <div class="recipe__top--info">
                    <h2 class="recipe__top--info-title">${recipe.title}</h2>
                    <h4 class="recipe__top--info-author">${recipe.author}</h4>
                    <div class="recipe__top--info-servingsLikes">
                    <p class="recipe__top--info-servings"><i class="fas fa-utensils"></i> Serves: ${
                      recipe.servings
                    }</p>
                    <p class="like-btn"><i class="far fa-heart"></i></p>
                    </div>
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
                        ${getNutritionalInfo(recipe.nutrition, recipe.servings)}
                      <p class="nutrition__info">*Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be highter or lower depending on your calorie needs.</p>
                  </div>
                  <div class="recipe__bottom__left">
                    <ul class="recipe__bottom--ingList">
                      <p class="recipe__bottom--ingList-title">Ingredients</p>
                      ${getIngredientsString(recipe.ingredients, shopping_list)}
                    </ul>
                    <a target="_blank" class="recipe__bottom--ingList-link" href="${
                      recipe.url
                    }">Read Directions</a>
                  </div>   
              </div>
    `;
  el.recipe.innerHTML = html;
};

export const clearRecipe = () => {
  el.recipe.innerHTML = "";
};

export const noRecipe = () => {
  el.recipe.innerHTML = `<p class="noRecipes">Search for a recipe</p>`;
};
