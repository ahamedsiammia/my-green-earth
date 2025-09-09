const categoryContainer = document.getElementById("category-container");
const cardContainer = document.getElementById("card-container");
const bookmarkContainer = document.getElementById("bookmark-container");
const detilesContainer = document.getElementById("detiles-container");
const totalBtn = document.getElementById("total-btn");


let bookmarks = [];

// show category

const loadCategory = (id) => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
      showCategory(data.categories);
    });
};

const showCategory = (category) => {
  category.forEach((cate) => {
    const div = document.createElement("div");
    div.innerHTML = `<div id="category-btn-${cate.id}" onclick ="loadCard(${cate.id})" class=" md:text-left text-center mt-3 hover:bg-[#15803d] hover:text-white p-2  rounded-lg w-full category-tree ">${cate.category_name}</div>`;
    categoryContainer.appendChild(div);
  });
};
//                                 end category

//                                category btn remove active class
const removeActive = () => {
  const categoryTree = document.querySelectorAll(".category-tree");
  categoryTree.forEach((btn) => btn.classList.remove("active"));
};

//                                start  load card
const loadCard = (carded) => {
  fetch(`https://openapi.programming-hero.com/api/category/${carded}`)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const categoryBtn = document.getElementById(`category-btn-${carded}`);
      categoryBtn.classList.add("active");
      showCard(data.plants);
    });

  showLoading();
};

const showCard = (cards) => {
  cardContainer.innerHTML = "";
  cards.forEach((card) => {
    const creatDiv = document.createElement("div");
    creatDiv.innerHTML = `<div class=" shadow-md h-[550px] mt-2  p-4 rounded-lg bg-white ">
    <img class=" w-full h-[50%] rounded-xl text-[#1f2937] " src="${card.image}" alt="">
    <h1 onclick="loadPalantDetiles(${card.id})" class="font-bold mt-2 ">${card.name}</h1>
    <p class="mt-3">${card.description}</p>
    <div class="flex justify-between items-center">
        <button class="btn bg-[#DCFCE7] text-[#15803D] rounded-2xl mt-3">${card.category}</button>
    <p id="price" class="font-bold">৳<span>${card.price}</span></p>
    </div>
    <button class="addToCartBtn btn w-full rounded-2xl bg-green-600 text-white mt-8">Add to Cart</button>
  </div>`;
    cardContainer.appendChild(creatDiv);
  });
};
//                                     close load card

//                                start default show card
const defaultLoadCard = () => {
  fetch(`https://openapi.programming-hero.com/api/plants`)
    .then((res) => res.json())
    .then((data) => {
      defaultShowCard(data.plants);
    });
};

const defaultShowCard = (cards) => {
  cardContainer.innerHTML = "";
  cards.forEach((card) => {
    const creatDiv = document.createElement("div");
    creatDiv.innerHTML = `<div class=" shadow-md h-[550px] mt-2  p-4 rounded-lg bg-white ">
    <img class=" w-full h-[50%] rounded-xl text-[#1f2937] " src="${card.image}" alt="">
    <h1 onclick="loadPalantDetiles(${card.id})" class="font-bold mt-2 ">${card.name}</h1>
    <p class="mt-3">${card.description}</p>
    <div class="flex justify-between items-center">
        <button class="btn bg-[#DCFCE7] text-[#15803D] rounded-2xl mt-3">${card.category}</button>
    <p id="price" class="font-bold">৳<span>${card.price}</span></p>
    </div>
    <button onclick ="bookmarkCard(${card.price})" class="addToCartBtn btn w-full rounded-2xl bg-green-600 text-white mt-8">Add to Cart</button>
  </div>`;
    cardContainer.appendChild(creatDiv);
  });
};
//                                  close default show card



cardContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("addToCartBtn")) {
    addCard(e);
    const treeName = e.target.parentNode.querySelector("h1").innerText;
    alert(`${treeName} has been added to cart`);
  }
});

const addCard = (e) => {
  console.log(e.target.parentNode);
  const title = e.target.parentNode.querySelector("h1").innerText;
  const price = parseInt(
    e.target.parentNode.children[3].querySelector("p").querySelector("span").innerText
  );
  const tree = e.target.parentNode.children[1].innerText;
  bookmarks.push({
    title: title,
    tree: tree,
    price: price,
    
  });
  showAddCard(bookmarks);
};

//                                        total price
const showAddCard = (bookmarks) => {
  bookmarkContainer.innerHTML = "";

  let total = 0;

  bookmarks.forEach((bookmark, index) => {
    let bookmarkPrice = parseInt(bookmark.price);
    total += bookmarkPrice;

    bookmarkContainer.innerHTML += `
      <div class="my-2 p-1 bg-[#F0FDF4] rounded-lg">
        <div class="flex justify-between px-2">
          <h1>${bookmark.title}</h1> 
          <h1>${bookmark.price}</h1>
        </div> <br>
        <button onclick="deleteBtn(${index})" 
                class="btn rounded-xl bg-[#F0FDF4] hover:bg-[#15803d] mt-5">
          Delete
        </button>
      </div>
    `;
  });

  totalBtn.innerText = total;
};

//                                        Delete a bookmark
const deleteBtn = (index) => {
  bookmarks.splice(index, 1);
  showAddCard(bookmarks); 
};


//                            start   modal

const loadPalantDetiles = async (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  console.log(url);
  const res = await fetch(url);
  const datiles = await res.json();
  showPalantDetiles(datiles.plants);
};
const showPalantDetiles = (data) => {
  console.log(data);
  detilesContainer.innerHTML = `
    <div>
    <h1 class ="font-bold">${data.name}</h1>
    <img class =" w-full h-[300px]  rounded-xl text-[#1f2937]  mt-2 " src="${data.image}"/>
    <h1 class ="font-bold mt-2">   Price : <span class="font-bold text-2xl">৳</span> ${data.price}</h1>
    <p> <span class="font-bold ">description :</span> ${data.description}</p>
    </div>
    `;

  document.getElementById("plant_modal").showModal();
};
//                                                close modal

const showLoading = () => {
  cardContainer.innerHTML = `
    <h1 class=""><span class="loading loading-spinner text-error"></span></h1>
    `;
};

loadCategory();
defaultLoadCard();