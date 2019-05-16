export default class List {
  constructor() {
    this.list = [];
  }

  addItem = item => {
    this.list.push(item);
  };

  removeItem = () => {};
}
