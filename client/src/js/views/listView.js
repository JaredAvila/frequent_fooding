import { elements as el } from "./base";

export const addListItem = item => {
  const markup = `
        <li class="listItem" data-itemid="${item.id}">${
    item.item
  } <i class="fas fa-minus-circle"></i></li>
    `;
  el.shoppingList.insertAdjacentHTML("beforeend", markup);
};

export const deleteListItem = id => {
  const item = document.querySelector(`[data-itemid="${id}"]`);
  if (item) item.parentElement.removeChild(item);
};
