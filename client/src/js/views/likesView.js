import { elements as el } from "./base";

export const toggleLikesBtn = like => {
  let markup;
  like
    ? (markup = `<i class="far fa-heart"></i>`)
    : (markup = `<i class="fas fa-heart"></i>`);
  return markup;
};
