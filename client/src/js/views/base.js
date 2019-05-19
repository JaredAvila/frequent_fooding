export const elements = {
  searchForm: document.querySelector(".navbar__search"),
  searchInput: document.querySelector(".navbar__search--input"),
  recipeList: document.querySelector(".recipes__list"),
  paginationBtns: document.querySelector(".recipes__pagination"),
  recipe: document.querySelector(".display-recipe"),
  footer: document.querySelector(".footer"),
  shoppingList: document.querySelector(".shopping_list-list"),
  addButton: document.querySelector(".addToList"),
  likeListBtn: document.querySelector(".navbar__favorites"),
  likesListContainer: document.querySelector(".likesList"),
  likesListUL: document.querySelector(".likesList__list")
};

export const loadingSpinner = parent => {
  const spinner = `
            <div class="spinner">
              <img src="img/loader.png" alt="results loading..." />
            </div>
  `;
  parent.insertAdjacentHTML("afterbegin", spinner);
};

export const clearSpinner = () => {
  const spinner = document.querySelector(`.spinner`);
  if (spinner) spinner.parentElement.removeChild(spinner);
};

export const displayFooter = () => {
  const year = new Date().getFullYear();
  elements.footer.innerHTML = `
  <div id="edamam-badge" class="swag" data-color="white"></div>
  <p>&copy; ${year} | Jared Avila Designs</p>
  `;
};
