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

const addButtons = document.querySelectorAll(".add-btn");
addButtons.forEach(addButton => {
    addButton.addEventListener("click", clickButton)
})

let buyButton = document.querySelector(".buy-btn");
buyButton.addEventListener("click", buyCart)

let cart = document.querySelector("#cart");

function clickButton(e) {
    let button = e.target;
    let element = button.closest(".card");
    let elementTitle = element.querySelector(".card-title").innerText;
    let elementPrice = element.querySelector(".card-precio").innerText;
    let elementImg = element.querySelector(".card-img-top").src;

    addToCart(elementTitle,elementPrice,elementImg);
}

function addToCart(elementTitle,elementPrice,elementImg) {
    let cartPanelRow = document.createElement("div");
    let newPanelContent = `<div class="cart__panel py-2 d-flex align-items-center"> 
    <div class="item d-flex justify-content-between align-items-center">
        <div class="item__picture mx-3">
            <img class="item__img" src="${elementImg}" alt="">
        </div>
        <div class="item__info d-flex justify-content-between align-items-center">
            <h5 class="item__title">${elementTitle}</h5>
            <div class="item__quantity">
                <input class="quantity__input" type="number" value="1">
            </div>
            <div class="item__price-container">
                <span class="item__price price-font">${elementPrice}</span>
            </div>
        </div>
        <div class="btn-wrapper p-3">
            <button class="item__delete-btn d-flex justify-content-center align-items-center">x</button>
        </div>
    </div>
    </div>`;
    cartPanelRow.innerHTML = newPanelContent;
    cart.append(cartPanelRow);

    cartPanelRow.querySelector(".item__delete-btn").addEventListener("click", deleteItem);

    cartPanelRow.querySelector(".quantity__input").addEventListener("change", changeQuantity);

    updateTotalPrice();
}

function updateTotalPrice() {
    let totalPrice = 0;
    let cartTotalPrice = document.querySelector(".total-price");
    const cartItems = document.querySelectorAll(".cart__panel");

    cartItems.forEach(cartItem => {
        let cartItemPrice = cartItem.querySelector(".item__price");
        let cartItemPriceNumber = Number(cartItemPrice.innerText);

        let cartItemQuantity = cartItem.querySelector(".quantity__input");
        let cartItemQuantityNumber = Number(cartItemQuantity.value);

        totalPrice = totalPrice + cartItemPriceNumber * cartItemQuantityNumber;
    })

    cartTotalPrice.innerHTML = `$ ${totalPrice}`;

}

function deleteItem(e) {
    let btn = e.target;
    btn.closest(".cart__panel").remove();

    updateTotalPrice()
}

function changeQuantity(e) {
    let quantityInput = e.target;
    if (quantityInput.value <= 0) {
        quantityInput.value = 1
    }

    updateTotalPrice()
}

function buyCart() {
    cart.innerHTML = ""
    updateTotalPrice()
}

// ----------------------------------------------------


