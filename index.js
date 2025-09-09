const categoryContainer = document.getElementById('category-container')
const cardContainer = document.getElementById('card-container')
const bookmarkContainer = document.getElementById('bookmark-container')
const detilesContainer = document.getElementById('detiles-container')
// const deleteBtn = document.getElementById('delete-btn')
let  totalBtn = document.getElementById('total-btn')

let bookmarks = [];

                                 // show category

const loadCategory = (id) =>{
    fetch('https://openapi.programming-hero.com/api/categories')
    .then((res) => res.json())
    .then((data) =>{
        showCategory((data.categories))
    })     
}

const showCategory = (category) =>{
    category.forEach((cate) =>{
        // console.log(cate)
        const div = document.createElement('div')
        div.innerHTML = `<div id="category-btn-${cate.id}" onclick ="loadCard(${cate.id})" class=" md:text-left text-center mt-3 hover:bg-[#15803d] p-2  rounded-lg w-full category-tree ">${cate.category_name}</div>`
    categoryContainer.appendChild(div)
        
    })
}
//                                 end category

//                                category btn remove active class
const removeActive =()=>{
    const categoryTree = document.querySelectorAll(".category-tree")
    categoryTree.forEach((btn) => btn.classList.remove("active"));
}


//                                start  load card 
const loadCard = (carded)=>{
    fetch(`https://openapi.programming-hero.com/api/category/${carded}`)
    .then((res)=>res.json())
    .then((data) =>{
        removeActive()
        const categoryBtn = document.getElementById(`category-btn-${carded}`)
        // console.log(categoryBtn)
        categoryBtn.classList.add('active')
         showCard((data.plants))
        console.log(data)
        
    })
    
    showLoading()
    
}

const showCard = (cards)=>{
    // console.log(cards)
    cardContainer.innerHTML = '';
    cards.forEach((card) =>{
        // console.log(card)
        const creatDiv = document.createElement('div')
        creatDiv.innerHTML =`<div class=" shadow-md h-[550px] mt-2  p-4 rounded-lg bg-white ">
    <img class=" w-full h-[50%] rounded-xl text-[#1f2937] " src="${card.image}" alt="">
    <h1 onclick="loadPalantDetiles(${card.id})" class="font-bold mt-2 ">${card.name}</h1>
    <p class="mt-3">${card.description}</p>
    <div class="flex justify-between items-center">
        <button class="btn bg-[#DCFCE7] text-[#15803D] rounded-2xl mt-3">${card.category}</button>
    <p id="price" class="font-bold">৳${card.price}</p>
    </div>
    <button class="btn w-full rounded-2xl bg-green-600 text-white mt-8">Add to Cart</button>
  </div>`
        cardContainer.appendChild(creatDiv)
        
        
    })

}
//                                     close load card 


//                                start default show card
const defaultLoadCard = ()=>{
    fetch(`https://openapi.programming-hero.com/api/plants`)
    .then((res)=>res.json())
    .then((data) =>{
         defaultShowCard((data.plants))
        console.log(data)
        
    })
    
}

const defaultShowCard = (cards)=>{
    // console.log(cards[2])
    cardContainer.innerHTML = '';
    cards.forEach((card)=>{
        // console.log(card)
        const creatDiv = document.createElement('div')
        creatDiv.innerHTML =`<div class=" shadow-md h-[550px] mt-2  p-4 rounded-lg bg-white ">
    <img class=" w-full h-[50%] rounded-xl text-[#1f2937] " src="${card.image}" alt="">
    <h1 onclick="loadPalantDetiles(${card.id})" class="font-bold mt-2 ">${card.name}</h1>
    <p class="mt-3">${card.description}</p>
    <div class="flex justify-between items-center">
        <button class="btn bg-[#DCFCE7] text-[#15803D] rounded-2xl mt-3">${card.category}</button>
    <p id="price" class="font-bold">৳${card.price}</p>
    </div>
    <button onclick ="bookmarkCard(${card.price})" class="btn w-full rounded-2xl bg-green-600 text-white mt-8">Add to Cart</button>
  </div>`
        cardContainer.appendChild(creatDiv)
    })
}
//                                  close default show card

const bookmarkCard = (prices)=>{
    let taka = 0;
    // console.log(prices)
    
        const btnPrice = ()=>{
            allPrice = totalBtn + prices
        return allPrice;
        }   
    btnPrice()
}
bookmarkCard()

 cardContainer.addEventListener('click',(e)=>{
    // console.log(e.target.innerText)
    if(e.target.innerText === 'Add to Cart'){
        addCard(e)
        const treeName = e.target.parentNode.querySelector('h1').innerText
        alert( `${treeName} has been added to cart`)
    }
 })

const addCard = (e) =>{
    console.log(e.target.parentNode)

    const title = (e.target.parentNode.children[3].innerText)
    const tree = (e.target.parentNode.children[1].innerText)
    // console.log(name)
        bookmarks.push({
            title:title,
            tree:tree
        })
        showAddCard(bookmarks)
}

const showAddCard = (bookmarks) =>{
    bookmarkContainer.innerHTML = '';
    bookmarks.forEach((addcard) =>{
         
        bookmarkContainer.innerHTML +=`
        <div class=" my-2 p-1 bg-[#F0FDF4] rounded-lg ">
        <h >${addcard.title}</h> <br>
        <button onclick="deleteBtn()" class="btn rounded-xl bg-[#F0FDF4] hover:bg-[#15803d] mt-5">Delete</button>
        </div>
        `
       
    })
    

}

const deleteBtn = (id)=>{
    fetch(`https://openapi.programming-hero.com/api/plants/`)
    .then((res)=>res.json())
    .then((data) =>{
        console.log(data.plants)
        
    })
    
}


//                            start   modal

const loadPalantDetiles = async(id)=>{
    const url = (`https://openapi.programming-hero.com/api/plant/${id}`)
    console.log(url);
    const res = await fetch(url);
    const datiles =await res.json();
    showPalantDetiles(datiles.plants)

}
const showPalantDetiles = (data) =>{
    console.log(data)
    detilesContainer.innerHTML =`
    <div>
    <h1 class ="font-bold">${data.name}</h1>
    <img class =" w-full h-[300px]  rounded-xl text-[#1f2937]  mt-2 " src="${data.image}"/>
    <h1 class ="font-bold mt-2">৳${data.price}</h1>
    <p>${data.description}</p>
    </div>
    `
    document.getElementById('plant_modal').showModal()
}
//                                                close modal



const showLoading = ()=>{
    cardContainer.innerHTML =`
    <h1 class=""><span class="loading loading-spinner text-error"></span></h1>
    `
}


loadCategory()
defaultLoadCard()