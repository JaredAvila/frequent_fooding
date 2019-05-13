export default class Recipe {
  constructor(recipe) {
    this.title = recipe.label;
    this.img = recipe.image;
    this.author = recipe.source;
    this.ingredients = recipe.ingredientLines;
    this.url = recipe.url;
    this.servings = recipe.yield;
    this.cal = recipe.calories;
    this.nutrition = recipe.digest;
    this.health = recipe.healthLabels;
  }
}
