import { elements as el } from "./base";

export const getInput = () => el.searchInput.value;

export const clearInput = () => {
  el.searchInput.value = "";
};
