// const _url =
//   "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcbda";

const foodItems = [
  "carrot",
  "broccoli",
  "asparagus",
  "cauliflower",
  "corn",
  "cucumber",
  "green pepper",
  "lettuce",
  "mushrooms",
  "onion",
  "potato",
  "pumpkin",
  "red pepper",
  "tomato",
  "beetroot",
  "brussel sprouts",
  "peas",
  "zucchini",
  "radish",
  "sweet potato",
  "artichoke",
  "leek",
  "cabbage",
  "celery",
  "chili",
  "garlic",
  "basil",
  "coriander",
  "parsley",
  "dill",
  "rosemary",
  "oregano",
  "cinnamon",
  "saffron",
  "green bean",
  "bean",
  "chickpea",
  "lentil",
  "apple",
  "apricot",
  "avocado",
  "banana",
  "blackberry",
  "blackcurrant",
  "blueberry",
  "boysenberry",
  "cherry",
  "coconut",
  "fig",
  "grape",
  "grapefruit",
  "kiwifruit",
  "lemon",
  "lime",
  "lychee",
  "mandarin",
  "mango",
  "melon",
  "nectarine",
  "orange",
  "papaya",
  "passion fruit",
  "peach",
  "pear",
  "pineapple",
  "plum",
  "pomegranate",
  "quince",
  "raspberry",
  "strawberry",
  "watermelon",
  "salad",
  "pizza",
  "pasta",
  "popcorn",
  "lobster",
  "steak",
  "bbq",
  "pudding",
  "hamburger",
  "pie",
  "cake",
  "sausage",
  "tacos",
  "kebab",
  "poutine",
  "seafood",
  "chips",
  "fries",
  "masala",
  "paella",
  "som tam",
  "chicken",
  "toast",
  "marzipan",
  "tofu",
  "ketchup",
  "hummus",
  "chili",
  "maple syrup",
  "parma ham",
  "fajitas",
  "champ",
  "lasagna",
  "poke",
  "chocolate",
  "croissant",
  "arepas",
  "bunny chow",
  "pierogi",
  "donuts",
  "rendang",
  "sushi",
  "ice cream",
  "duck",
  "curry",
  "beef",
  "goat",
  "lamb",
  "turkey",
  "pork",
  "fish",
  "crab",
  "bacon",
  "ham",
  "pepperoni",
  "salami",
  "ribs",
];
const body = document.querySelector("body");
const main = document.querySelector("main");
const queries = document.querySelector(".queries ul");
const search = document.querySelector(".search");
const searchInput = document.getElementById("searchInput");
const article = document.querySelector("article");
let closeBtn;
let prev, next;
let allFullRecipes;
let pages = document.querySelector(".pages");
let cards = document.querySelector(".cards");

let curPage = 1;

foodItems.sort();

search.addEventListener("submit", function (e) {
  e.preventDefault();
  clearHtml();
  curPage = 1;
  showData(searchInput.value);
  searchInput.value = "";
});
foodItems.forEach((element) => {
  queries.innerHTML += `
       <li>${element.charAt(0).toUpperCase() + element.slice(1)}</li>
    `;
});

const allRecipes = document.querySelectorAll(".queries ul li");

allRecipes.forEach((recipe) => {
  recipe.addEventListener("click", function () {
    clearHtml();
    curPage = 1;
    showData(recipe.textContent);
  });
});

function htmlRenderer(data) {
  data.forEach((element) => {
    cards.innerHTML += `
    <div class="card">
    <img src="${element.image_url}" alt="Image" />
    <div class="card-info">
      <div class="title">
        <span>Title: <strong>${element.title}</strong></span>
        <div class="description">
          <span><i>Description: </i></span>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Ullam maiores quos ducimus amet. Expedita iusto molestias
            atque reiciendis, ipsa inventore natus fugiat ratione
            cupiditate ad libero rem aut. Officia, in.
          </p>
        </div>
      </div>
      <div class="publisher">
        <div class="publisher-name">
          <span>Publisher: </span>
          <span><strong>${element.publisher}</strong></span>
        </div>
        <button data-recipe-id="${element.id}">See Full Recipe</button>
      </div>
    </div>
  </div>
    `;

    allFullRecipes = document.querySelectorAll(".card-info .publisher button");
  });

  allFullRecipes.forEach((fullRecipe) => {
    fullRecipe.addEventListener("click", function () {
      const id = fullRecipe.getAttribute("data-recipe-id");

      fetchFullRecipe(id);
      article.style.visibility = "visible";
      body.style.overflow = "hidden";
    });
  });
}

function clearHtml() {
  cards.innerHTML = ``;
}

function showData(query) {
  const _url = `https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`;
  fetch(_url)
    .then((response) => response.json())
    .then((data) => {
      clearHtml();
      htmlRenderer(getSearchResultsPage(data.data.recipes));
      const numPages = Math.ceil(data.data.recipes.length / 10);
      pagination(numPages);
      prev = document.querySelector(".prev");
      next = document.querySelector(".next");

      if (prev) {
        prev.addEventListener("click", function () {
          const goToPrevPage = +prev.dataset.goto;
          curPage--;
          clearHtml();
          htmlRenderer(getSearchResultsPage(data.data.recipes, goToPrevPage));
          showData(query);
        });
      }

      if (next) {
        next.addEventListener("click", function () {
          const goToNextPage = +next.dataset.goto;
          curPage++;
          clearHtml();
          htmlRenderer(getSearchResultsPage(data.data.recipes, goToNextPage));
          showData(query);
        });
      }
    });
}

function getSearchResultsPage(arr, page = curPage) {
  const start = (page - 1) * 10;
  const end = page * 10;
  return arr.slice(start, end);
}

function pagination(numPages) {
  if (curPage === 1 && numPages > 1) {
    pages.innerHTML = `
    <div data-goto="${curPage + 1}" class="next" >
      <span>${curPage + 1}</span>
      <i class="fa-solid fa-arrow-right" style="color: #636569"></i>
    </div>
    `;
    return;
  }
  if (curPage === numPages && numPages > 1) {
    pages.innerHTML = `
     <div data-goto="${curPage - 1}" class="prev">
       <i class="fa-solid fa-arrow-left" style="color: #636569"></i>
       <span>${curPage - 1}</span>
     </div>
    `;
    return;
  }
  if (curPage < numPages) {
    pages.innerHTML = `
     <div data-goto="${curPage - 1}" class="prev">
       <i class="fa-solid fa-arrow-left" style="color: #636569"></i>
       <span>${curPage - 1}</span>
     </div>
     <div data-goto="${curPage + 1}" class="next">
       <span>${curPage + 1}</span>
       <i class="fa-solid fa-arrow-right" style="color: #636569"></i>
     </div>
    `;
    return;
  }

  pages.innerHTML = ``;
}

/* script for recipe.html */

function fetchFullRecipe(id) {
  fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`)
    .then((response) => response.json())
    .then((data) => {
      renderFullRecipe(data.data.recipe);
    });
}

function renderFullRecipe(data) {
  article.innerHTML = "";
  article.innerHTML = `
  <img src="${data.image_url}" alt="Image">
  <div class="article-description">
      <div class="servings">
          <span>Cooking Time: <strong>${data.cooking_time}</strong></span>
          <span>Servings: <strong>${data.servings}</strong></span>
      </div>
      <div class="article-publisher">
          <span>Publisher: <strong>${data.publisher}</strong></span>
          <span>Title: <strong>${data.title}</strong></span>
      </div>      
      <div class="ingredients">
        <h2>Ingredients</h2>
        <div class="ingredients-div>
          <ul class="recipe-ingredient-list">
             ${data.ingredients
               .map((ing) => {
                 return `
             <li class="ingredients-li">
               <div class="recipe-quantity">${
                 ing.quantity ? ing.quantity : ""
               }</div>
               <div class="recipe-description">
                 <span class="recipe-unit">${ing.unit}</span>
                 ${ing.description}
               </div>
             </li>
              `;
               })
               .join("")}
          </ul>
        </div>
      </div>
      <div class ="source">
        <a href="${data.source_url}" target="_blank">Source</a>
        <button onclick="hideArticle()">X</button>
      </div>  
  </div>
  `;
  closeBtn = document.querySelector(".source button");
}

function hideArticle() {
  article.style.visibility = "hidden";
  body.style.overflow = "auto";
}
