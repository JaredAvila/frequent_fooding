import { elements as el } from "./base";
import { createIng } from "./recipeView";

export const addListItem = item => {
  const markup = `
        <li class="listItem" data-itemid="${item.id}">${item.item}<hr /></li>
  `;
  el.shoppingList.insertAdjacentHTML("beforeend", markup);
};

export const deleteListItem = (id, shopping_list, ingredients) => {
  const item = shopping_list.list.find(e => e.id === id);
  shopping_list.removeItem(id);
  ingredients.forEach(e => {
    if (e === item.item) {
      // current recipe has the item we just removed. Update button in recipe
      const elem = el.recipe;
      const children =
        elem.children[0].children[1].children[1].children[0].childNodes;
      const markup = createIng(item.item, shopping_list.list);
      children.forEach(child => {
        if (child.classList) {
          if (child.classList[0] === "ingList__item") {
            if (child.children[1].innerHTML === e) {
              child.innerHTML = markup;
            }
          }
        }
      });
    }
  });

  const itemObj = document.querySelector(`[data-itemid="${id}"]`);
  if (itemObj) itemObj.parentElement.removeChild(itemObj);
  return shopping_list;
};

export const deleteItem = id => {
  const itemObj = document.querySelector(`[data-itemid="${id}"]`);
  if (itemObj) itemObj.parentElement.removeChild(itemObj);
};
