class Camiseta {
    constructor(id, nombre, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
    }
}

let btnMostrarCarrito = document.querySelector(".mostrar-precio-final");

let productos = []
productos.push(new Camiseta(1, "Boca Juniors Titular 21/22", 8000, "./images/boca.jpg"));
productos.push(new Camiseta(2, "Boca Juniors Visitante 21/22", 8000, "./images/boca2.jpg"));
productos.push(new Camiseta(3, "River Plate Titular 21/22", 8000, "./images/river.webp"));
productos.push(new Camiseta(4, "River Plate Tercera 20/21", 5000, "./images/river2.jpg"));
productos.push(new Camiseta(5, "Argentina Titular", 10000, "./images/argentina1.jpg"))
productos.push(new Camiseta(6, "Argentina Visitante", 9000, "./images/argentina2.jpg"));

const carrito = [];

class Producto {
    constructor (nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }

    precioProducto() {
        return parseInt(this.precio);
    }
}

function mostrarCamiseta (productos) {
    let nuevaCard = document.querySelector("#contenedor");
    productos.forEach(element => {
        nuevaCard.innerHTML += `<div class="col">
            <div class="card" style="width: 18rem;">
                <img src="${element.img}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h3 class="card-text precio">$ ${element.precio}</h3>
                    <p class="card-title">${element.nombre}</p>
                    <button href="#" class="btn btn-primary btn-add">Agregar al carrito</button>
                </div>
            </div>
        </div>`
    })
}
/*
function agregarProducto() {
    let buttons = document.querySelectorAll(".btn-add");
    buttons.forEach(btn => {
        btn.addEventListener("click", function(e) {
            let element = e.target.parentElement.parentElement
            let nombre = element.querySelector(".card-title").innerText;
            let precio = element.querySelector(".precio").innerText;
            carrito.push(new Producto(nombre, precio))
            console.log(carrito)
        })
    })
}


function mostrarPrecioTotal(){
    let precioTotal = 0;
    carrito.forEach((element) => {
        element.precio = parseInt(element.precio.replace("$",""));
        precioTotal += parseInt(element.precio);
    })
    alert(precioTotal)
}

function mostrarCarrito() {
    btnMostrarCarrito.addEventListener("click", mostrarPrecioTotal)
}


document.addEventListener("DOMContentLoaded", function() {
    mostrarCamiseta(productos);
    agregarProducto();
    mostrarCarrito();
})
*/
