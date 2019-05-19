import { elements as el } from "./base";

export const toggleLikesBtn = like => {
  let markup;
  like
    ? (markup = `<i class="far fa-heart"></i>`)
    : (markup = `<i class="fas fa-heart" style="color: red"></i>`);
  return markup;
};

export const toggleNavBtn = check => {
  let markup;
  check
    ? (markup = `<i class="fas fa-times-circle"></i>`)
    : (markup = `<i class="fas fa-heart"></i>`);

  return markup;
};

export const rednerLikesList = likes => {
  const htmlArr = [];
  if (likes.length === 0) {
    return `<li><p class="noLikes">You have no liked recipes yet.</p></li>`;
  }
  likes.forEach(like => {
    htmlArr.push(`
        <li data-id="${like.recipe.id}" class="likesList__list--like">
          <img
            src="${like.recipe.img}"
            class="likesList__list--like-img"
            alt="test"
          />
          <p class="likesList__list--like-title">${like.recipe.title}</p>
          <hr />
        </li>
    `);
  });
  return htmlArr.join("");
};
