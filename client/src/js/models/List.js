import uniqid from "uniqid";

export default class List {
  constructor() {
    this.list = [];
  }

  addItem(item, btn) {
    const newItem = {
      id: uniqid(),
      item,
      btn
    };
    this.list.push(newItem);
    return newItem;
  }

  removeItem(id) {
    const index = this.list.findIndex(el => el.id === id);
    const btn = this.list.find(el => el.id === id).btn;
    this.list.splice(index, 1);
    return btn;
  }
}
