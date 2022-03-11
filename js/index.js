class Camiseta {
    constructor(id, nombre, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
    }
}

let productos = []
productos.push(new Camiseta(1, "Boca Juniors Titular 21/22", 8000, "./images/boca.jpg"));
productos.push(new Camiseta(2, "Boca Juniors Visitante 21/22", 8000, "./images/boca2.jpg"));
productos.push(new Camiseta(3, "River Plate Titular 21/22", 8000, "./images/river.webp"));
productos.push(new Camiseta(4, "River Plate Tercera 20/21", 5000, "./images/river2.jpg"));
productos.push(new Camiseta(5, "Argentina Titular", 10000, "./images/argentina1.jpg"))
productos.push(new Camiseta(6, "Argentina Visitante", 9000, "./images/argentina2.jpg"));

function mostrarCamiseta (productos) {
    let nuevaCard = document.querySelector("#contenedor");
    productos.forEach(producto => {
        nuevaCard.innerHTML += `<div class="col">
            <div class="card" style="width: 18rem;">
                <img src="${producto.img}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h3 class="card-text card-precio">${producto.precio}</h3>
                    <p class="card-title">${producto.nombre}</p>
                    <button href="#" class="btn btn-primary add-btn">Agregar al carrito</button>
                </div>
            </div>
        </div>`
    })
}

mostrarCamiseta(productos);

// ----------------------------------------------------

const addButtons = document.querySelectorAll(".add-btn");
addButtons.forEach(addButton => {
    addButton.addEventListener("click", clickButton)
})

let cart = document.querySelector("#cart");

function clickButton(event) {
    let btn = event.target;
    let element = btn.closest(".card");
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

    updateTotalPrice()
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
