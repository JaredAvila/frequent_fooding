export const elements = {
  searchForm: document.querySelector(".navbar__search"),
  searchInput: document.querySelector(".navbar__search--input"),
  searchResList: document.querySelector(".recipes__list"),
  allListItems: document.querySelectorAll(".recipes__list"),
  paginationBtns: document.querySelector(".recipes__pagination"),
  recipePage: document.querySelector(".display-recipe")
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
