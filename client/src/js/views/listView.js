import { elements as el } from "./base";
import { createIng } from "./recipeView";

export const addListItem = item => {
  const markup = `
        <li class="listItem" data-itemid="${item.id}">${item.item}<hr /></li>
  `;
  el.shoppingList.insertAdjacentHTML("beforeend", markup);
};

export const deleteListItem = (id, shopping_list) => {
  const item = shopping_list.list.find(e => e.id === id);
  shopping_list.removeItem(id);
  const markup = createIng(item.item, shopping_list.list);
  console.log(markup);
  const itemObj = document.querySelector(`[data-itemid="${id}"]`);
  if (itemObj) itemObj.parentElement.removeChild(itemObj);
};
