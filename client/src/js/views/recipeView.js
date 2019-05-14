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
  nutritionalArray.push(`
    <div class="black_spacer_large"></div>`);
  // join array and return
  return nutritionalArray.join("");
};

const getIngredients = ingredients => {
  // loop through array and create array of HTML
  let ingrArray = [];
  ingredients.forEach(ing => {
    ingrArray.push(`<li class="ingList__item">${ing}</li>`);
  });
  // join array and return
  return ingrArray.join("");
};

export const renderRecipe = recipe => {
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
                        ${getNutritionalInfo(recipe.nutrition, recipe.servings)}
                      <p class="nutrition__info">*Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be highter or lower depending on your calorie needs.</p>
                  </div>
                  <div class="recipe__bottom__left">
                    <ul class="recipe__bottom--ingList">
                      <p class="recipe__bottom--ingList-title">Ingredients</p>
                      ${getIngredients(recipe.ingredients)}
                    </ul>
                    <a target="_blank" class="recipe__bottom--ingList-link" href="${
                      recipe.url
                    }">Read Directions</a>
                  </div>   
              </div>
    `;
  el.recipePage.innerHTML = html;
};

export const clearRecipe = () => {
  el.recipePage.innerHTML = "";
};

export const noRecipe = () => {
  el.recipePage.innerHTML = `<p class="noRecipes">Search for a recipe</p>`;
};
