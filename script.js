const loadCategories =()=>{
    const url = "https://openapi.programming-hero.com/api/categories";
    fetch(url)
    .then((res) => res.json())
    .then((json)=> displayCategories(json.categories));

};

const addToCard=(card)=>{
    const cartContainer = document.getElementById('cartList');
    
        const newDiv = document.createElement('div');
        newDiv.innerHTML= `<div class=" bg-green-100 flex justify-between items-center p-4 rounded-lg mb-2" >
                    <div id="cart">
                    <p class="font-bold">${card.name}</p>
                    <p>৳${card.price}</p>
                   </div>
                    <button class="text-red-600 font-bold removeBtn">X</button>
                </div>`;
            cartContainer.append(newDiv);
//total
            const grandTotal = document.getElementById('total');
            let currentTotal = parseInt(grandTotal.innerText);
            grandTotal.innerText = currentTotal + card.price;
// remove
     const removeBtn = newDiv.querySelector('.removeBtn');
     removeBtn.addEventListener("click",() => {
        cartContainer.removeChild(newDiv);
        
    let currentTotal = parseInt(grandTotal.innerText);
     grandTotal.innerText = currentTotal - card.price;

    })
    }
//spinner
const manageSpinner = (status)=>{
    if(status==true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("card-container").classList.add("hidden");
    }
    else{
        document.getElementById("card-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}

//alltrees
const loadAllTree =()=>{
    const url="https://openapi.programming-hero.com/api/plants";
    fetch(url)
    .then((res)=> res.json())
    .then((data)=>displayPlantCards(data.plants));
}
//Tress
const loadTree=(id)=>{
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/category/${id}`;
    fetch(url)
    .then((res)=> res.json())
    .then(data=> displayPlantCards(data.plants));
};

const loadPlantDetail= async(id)=>{
    const url=`https://openapi.programming-hero.com/api/plant/${id}`;
    
    const res = await fetch(url);
    const details = await res.json();
   displayPlantDetails(details.plants);
}
const displayPlantDetails = (plant)=>{
    console.log(plant);
    const detailsContainer = document.getElementById('details-container');

     detailsContainer.innerHTML = `<div>
        <h2 class="font-bold text-xl mb-3">${plant.name}</h2>
        <img src="${plant.image}" alt="">
    </div>
    <div class="flex gap-2" >
        <h3 class="font-bold">Category:</h3>
        <p class="text-[#1F2937]">${plant.category}</p>
    </div>
    <div class="flex gap-2">
        <h3 class="font-bold">Price:</h3>
        <p class="text-[#1F2937]">৳${plant.price}</p>
    </div>
    <div class="flex gap-2"> 
        <h3 class="font-bold">Description:</h3>
        <p class="text-[#1F2937]">${plant.description}</p>
    </div>`;
document.getElementById("plant_modal").showModal();
}


const displayPlantCards=(cards)=>{
    // console.log(cards);
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML= "";
    
    for(let card of cards){
        //  console.log(card);
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML=`
          <div class="bg-white rounded-xl p-4 flex flex-col h-[400px] shadow-sm">
            <img src="${card.image}" alt="" class="w-full h-50 object-cover">

            <button onclick="loadPlantDetail(${card.id})"class="font-bold text-left">${card.name}</button>
            
            <p class="overflow-hidden h-[120px] mb-5">${card.description}</p>
            <div class="flex justify-between items-center mb-2">
                <button class="bg-[#DCFCE7] text-green-500 px-3 py-1 rounded-full w-24 truncate ">${card.category}</button>

                <p class="font-bold">৳${card.price}</p>
                </div>
                <button class="bg-[#15803D] text-white px-3 py-2 rounded-3xl w-full" onclick="addToCard({id:'${card.id}', name:'${card.name}',price:${card.price}})">Add to Cart</button>
        </div>
        `
        cardContainer.append(cardDiv);
    }
    manageSpinner(false);
}

//categories
const displayCategories=(categories)=>{
    const categoriesContainer = document.getElementById('categories-container');
    categoriesContainer.innerHTML= "";
    for(let category of categories){
        // console.log(category);
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `<button class="px-5 py-2 font-semibold  text-[#1F2937] focus:bg-green-900 focus:text-white " onclick="loadTree('${category.id}')">${category.category_name}</button> 
        `
       categoriesContainer.append(btnDiv);
    }
    
};




loadCategories();
loadAllTree();
