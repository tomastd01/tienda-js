window.onload = function() {
    const storage = JSON.parse(localStorage.getItem("cart"));
    if (storage) {
        cart = storage;
        addCart()
    }
}

class Shirt {
    constructor(id, name, price, img) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.img = img;
    }
}

let products = []
products.push(new Shirt(1, "Boca Juniors Titular 21/22", 10999, "./images/boca.jpg"));
products.push(new Shirt(2, "Boca Juniors Visitante 21/22", 9999, "./images/boca2.jpg"));
products.push(new Shirt(3, "River Plate Titular 21/22", 10999, "./images/river.webp"));
products.push(new Shirt(4, "River Plate Visitante 21/22", 10999, "./images/river2.jpg"));
products.push(new Shirt(5, "Argentina Titular 2021", 10999, "./images/argentina1.jpg"))
products.push(new Shirt(6, "Argentina Visitante 2021", 9999, "./images/argentina2.jpg"));

function showShirtItem (products) {
    let newCard = document.querySelector("#contenedor");
    products.forEach(product => {
        newCard.innerHTML += `<div class="col">
            <div class="card" style="width: 18rem;">
                <img src="${product.img}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h3 class="card-text card-precio">${product.price}</h3>
                    <p class="card-title">${product.name}</p>
                    <button href="#" class="btn btn-primary add-btn">Agregar al carrito</button>
                </div>
            </div>
        </div>`
    })
}

showShirtItem(products);

let cart = [];
let renderdCart = document.querySelector(".cart");

const addButtons = document.querySelectorAll(".add-btn");
addButtons.forEach(addButton => {
    addButton.addEventListener("click", clickButton)
})

let buyButton = document.querySelector(".buy-btn");
buyButton.addEventListener("click", buyCart)

function clickButton(e) {
    let button = e.target;
    let element = button.closest(".card");
    let elementTitle = element.querySelector(".card-title").innerText;
    let elementPrice = element.querySelector(".card-precio").innerText;
    let elementImg = element.querySelector(".card-img-top").src;

    const newItem = {
        title: elementTitle,
        price: elementPrice,
        img: elementImg,
        quantity: 1
    }

    addToCart(newItem);
}

function addToCart(newItem) {

    let quantityInputs = document.querySelectorAll(".quantity__input");

    for(let i=0; i< cart.length; i++) {
        if(cart[i].title.trim() === newItem.title.trim()){
            cart[i].cantidad ++;
            let inputValue = quantityInputs[i]
            inputValue.value++;
            return null
        }
    }

    cart.push(newItem);

    addCart()
}

function addCart() {
    renderdCart.innerHTML = '';
    cart.map (item => {
        let cartPanelRow = document.createElement("div");
        cartPanelRow.classList.add("CartItem")

        let newPanelContent = `<div class="cart__panel py-2 d-flex align-items-center"> 
        <div class="item d-flex justify-content-between align-items-center">
            <div class="item__picture mx-3">
                <img class="item__img" src="${item.img}" alt="">
            </div>
            <div class="item__info d-flex justify-content-between align-items-center">
                <h5 class="item__title">${item.title}</h5>
                <div class="item__quantity">
                    <input class="quantity__input" type="number" value=${item.quantity}>
                </div>
                <div class="item__price-container">
                    <span class="item__price price-font">${item.price}</span>
                </div>
            </div>
            <div class="btn-wrapper p-3">
                <button class="item__delete-btn d-flex justify-content-center align-items-center">x</button>
            </div>
        </div>
        </div>`

        cartPanelRow.innerHTML = newPanelContent;
        renderdCart.append(cartPanelRow);


        const deleteItemButton = cartPanelRow.querySelector(".item__delete-btn");
        deleteItemButton.addEventListener("click", deleteItem);

        const quantityInput = cartPanelRow.querySelector(".quantity__input");
        quantityInput.addEventListener("change", changeQuantity);
    })

    updateTotalPrice();
}

function updateTotalPrice() {
    let totalPrice = 0;
    let cartTotalPrice = document.querySelector(".total-price");

    cart.forEach(item => {
        let itemPrice = Number(item.price);
        totalPrice = totalPrice + itemPrice * item.quantity;
    })

    cartTotalPrice.innerHTML = `$ ${totalPrice}`;
    saveLocalStorage()
}

function deleteItem(e) {
    let deleteBtn = e.target;
    const cartItem = deleteBtn.closest(".item");
    const itemTitle = cartItem.querySelector(".item__title").innerText;
    for(let i=0; i < cart.length; i++) {
        if(cart[i].title.trim() === itemTitle.trim()){
            cart.splice(i, 1)
        }
    }
    cartItem.remove();

    updateTotalPrice()
}

function changeQuantity(e) {
    let quantityInput = e.target;
    const cartItem = quantityInput.closest(".item");
    const itemTitle = cartItem.querySelector(".item__title").innerText;
    cart.forEach(item => {
        if(item.title.trim() === itemTitle) {
            quantityInput.value < 1 ? (quantityInput.value = 1) : quantityInput.value;
            item.quantity = quantityInput.value;

            updateTotalPrice()
        }
    })

}

function buyCart() {
    renderdCart.innerHTML = ""
    updateTotalPrice()
}

function saveLocalStorage() {
    localStorage.setItem("cart",JSON.stringify(cart))
}



