// Carga el cart del localStorage al recargar la pagina.
let cart;
window.onload = () => {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    showCartItems()
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
        const {id, name, img, price} = product;
        newCard.innerHTML += `<div class="col">
            <div class="card radius-0 border-0" style="width: 18rem;">
                <img src="${img}" class="card-img-top radius-0" alt="...">
                <div class="card-body">
                    <h5 class="card-text card-precio">${price}</h5>
                    <p class="card-title">${name}</p>
                    <span class="d-none card-id">${id}</span>
                    <button href="#" class="btn btn-outline-primary add-btn radius-0">Agregar al carrito</button>
                </div>
            </div>
        </div>`
    })
}

showShirtItem(products);

let renderdCart = document.querySelector(".cart");

const addButtons = document.querySelectorAll(".add-btn");
addButtons.forEach(addButton => {
    addButton.addEventListener("click", AddButton)
})


function AddButton(e) {
    
    Swal.fire({
        icon: 'success',
        title: 'El producto se ha agregado al carrito.',
        timer: 1100,
        showConfirmButton: false,
    })

    let button = e.target;
    let element = button.closest(".card");
    let elementId = element.querySelector(".card-id").textContent;
    let elementTitle = element.querySelector(".card-title").innerText;
    let elementPrice = element.querySelector(".card-precio").innerText;
    let elementImg = element.querySelector(".card-img-top").src;
    
    newItem(Number(elementId),elementTitle,elementPrice,elementImg)
}

// Crea un nuevo objeto por cada producto clickeado.
function newItem(elementId,elementTitle,elementPrice,elementImg) {

    const newItem = {
        id: elementId,
        title: elementTitle,
        price: elementPrice,
        img: elementImg,
        quantity: 1
    }

    addToCart(newItem);
}

//Añade el objeto al carro. Si en el carro ya existe un objeto con el mismo ID, aumenta la cantidad.
function addToCart( newItem ) {

    let quantityInputs = document.querySelectorAll(".quantity__input");

    for(let i=0; i < cart.length; i++) {
        
        if(cart[i].id === newItem.id){
            cart[i].quantity++;
            let inputValue = quantityInputs[i]
            inputValue.value++;
            updateTotalPrice()
            return null
        }
    }

    cart.push(newItem);
    showCartItems()
}

// Renderiza los objetos en que estan en el carrito.
function showCartItems() {

    renderdCart.innerHTML = '';

    cart.map (({id, title , price, img, quantity}) => {

        let cartPanelRow = document.createElement("div");
        cartPanelRow.classList.add("CartItem")

        let newPanelContent = `<div class="cart__panel py-2 d-flex align-items-center"> 
        <div class="item d-flex justify-content-between align-items-center">
            <div class="item__picture mx-3">
            <span class="d-none item__id">${id}</span>
                <img class="item__img" src="${img}" alt="">
            </div>
            <div class="item__info d-flex justify-content-between align-items-center">
                <h5 class="item__title">${title}</h5>
                <div class="item__quantity">
                    <input class="quantity__input" type="number" value=${quantity}>
                </div>
                <div class="item__price-container">
                    <span class="item__price price-font">${price}</span>
                </div>
            </div>
            <div class="btn-wrapper p-3">
                <button class="item__delete-btn btn-outline-danger d-flex justify-content-center align-items-center p-0">X</button>
            </div>
        </div>
        </div>`

        cartPanelRow.innerHTML = newPanelContent;
        renderdCart.append(cartPanelRow);


        const deleteItemButton = cartPanelRow.querySelector(".item__delete-btn");
        deleteItemButton.addEventListener("click", deleteItem);

        deleteItemButton.addEventListener("click", () => {
            Swal.fire({
                title: "El producto se ha eliminado del carrito",
                icon: "success",
                showConfirmButton: false,
                timer: 1100,
            })
        });

        const quantityInput = cartPanelRow.querySelector(".quantity__input");
        quantityInput.addEventListener("change", changeQuantity);
    })

    updateTotalPrice();
}

// Calcula el precio total dependiendo del precio y cantidad de camisetas que tenga el cart.
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

// Elimina el item del carrito al clickear el delete-button y recalcula el total.
function deleteItem(e) {

    let deleteBtn = e.target;
    const cartItem = deleteBtn.closest(".cart__panel");
    const itemId = cartItem.querySelector(".item__id").textContent;

    for(let i=0; i < cart.length; i++) {

        if(cart[i].id == itemId){
            cart.splice(i, 1)
        }
    }
    cartItem.remove();

    updateTotalPrice()
}

// Cambia la cantidad de camisetas al subir el numero con en el input.
function changeQuantity(e) {

    let quantityInput = e.target;
    const cartItem = quantityInput.closest(".item");
    const itemId = cartItem.querySelector(".item__id").textContent;

    cart.forEach( (item) => {

        if (item.id == itemId) {

            quantityInput.value < 1 ? (quantityInput.value = 1) : quantityInput.value;
            item.quantity = quantityInput.value;

            updateTotalPrice()
        }
    })

}

function saveLocalStorage() {
    localStorage.setItem("cart",JSON.stringify(cart))
}

const buyButton = document.querySelector(".buy-btn");
buyButton.addEventListener("click", () => {
    
    Swal.fire({

        title: "¿Deseas finalizar tu compra?",
        icon: "question",
        confirmButtonText: "Si, finalizar compra.",
        showCancelButton: true,
        cancelButtonText: "No, no quiero comprar",

    }).then(result => {

        if (result.isConfirmed) {

            Swal.fire({
                title: "Gracias por tu compra, master!",
                icon: "success",
            })
            buyCart()

        } else if (!result.isConfirmed) {

            Swal.fire ({
                title: "La compra fue cancelada.",
                icon: "error",
                showConfirmButton: false,
                timer: 1200
            })
        }
    }) 
})

function buyCart () {
    cart = []
    showCartItems()
}