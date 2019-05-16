import { elements as el } from "./base";

export const addListItem = item => {
  const markup = `
        <li data-itemid="${item.id}">${item.item}</li>
    `;
  el.shoppingList.insertAdjacentHTML("beforeend", markup);
};
