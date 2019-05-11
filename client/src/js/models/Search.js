import Axios from "axios";

export default class Search {
  constructor(search) {
    this.search = search;
  }
  async getRecipes() {
    try {
      const key = "ad79d88a2a8b07be1a581c0c79218223";
      const ID = "c804c269";
      //setup to recieve 20 recipes
      const res = await Axios(
        `https://api.edamam.com/search?q=${
          this.search
        }&app_id=${ID}&app_key=${key}&from=0&to=20`
      );
      this.recipes = res.data.hits;
    } catch (err) {
      console.log(err);
    }
  }
}
