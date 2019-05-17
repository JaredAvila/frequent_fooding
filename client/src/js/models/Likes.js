import uniqid from "uniqid";

export default class Likes {
  constructor() {
    this.likes = [];
  }

  addLike(recipe) {
    // push to likes array
    const like = { id: uniqid(), recipe };
    this.likes.push(like);
  }
  removeLike(id) {
    // find matching id index and remove from likes array
    const index = this.likes.findIndex(e => e.id === id);
    this.likes.splice(index, 1);
  }
}
