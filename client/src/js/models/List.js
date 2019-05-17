import uniqid from "uniqid";

export default class List {
  constructor() {
    this.list = [];
  }

  addItem(item) {
    const newItem = {
      id: uniqid(),
      item
    };
    this.list.push(newItem);
    return newItem;
  }

  removeItem(id) {
    const index = this.list.findIndex(el => el.id === id);
    this.list.splice(index, 1);
  }
}
