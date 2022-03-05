function calcularIva(camiseta) {
    return productos[camiseta].precio * 1.21;
}

class Camiseta {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

const productos = []
productos.push(new Camiseta("Boca Juniors Titular 21/22", 8000));
productos.push(new Camiseta("Boca Juniors Visitante 21/22", 8000));
productos.push(new Camiseta("River Plate Titular 21/22", 8000));
productos.push(new Camiseta("River Plate Tercera 20/21", 5000));
productos.push(new Camiseta("Argentina Titular", 10000))
productos.push(new Camiseta("Argentina Visitante", 9000));


const carrito = [];

function camisetas(numero) {
    carrito.push(productos[numero]) 
}

let elegirCamiseta = prompt(`¿Qué camiseta queres comprar? Escribí el numero de la elegida. \n \n 1. ${productos[0].nombre} \n 2. ${productos[1].nombre} \n 3. ${productos[2].nombre} \n 4. ${productos[3].nombre} \n 5. ${productos[4].nombre} \n 6. ${productos[5].nombre}`);
elegirCamiseta = elegirCamiseta.toLowerCase();

while (elegirCamiseta != "esc") {
    switch (elegirCamiseta) {
        case '1':
            agregar = prompt(`¿Quieres agregar ${productos[0].nombre} al carrito? "Si" o "No"`);
            agregar = agregar.toLowerCase();
            if (agregar = "si") {
                camisetas(0)
            }
            break
        case '2':
            agregar = prompt(`¿Quieres agregar ${productos[1].nombre} al carrito? "Si" o "No"`);
            agregar = agregar.toLowerCase();
            if (agregar = "si") {
                camisetas(1)
            }
            break;
        case '3':
            agregar = prompt(`¿Quieres agregar ${productos[2].nombre} al carrito? "Si" o "No"`);
            agregar = agregar.toLowerCase();
            if (agregar = "si") {
                camisetas(2)
            }
            break;
        case '4':
            agregar = prompt(`¿Quieres agregar ${productos[3].nombre} al carrito? "Si" o "No"`);
            agregar = agregar.toLowerCase();
            if (agregar = "si") {
                camisetas(3)
            }
            break;
        case '5':
            agregar = prompt(`¿Quieres agregar ${productos[4].nombre} al carrito? "Si" o "No"`);
            agregar = agregar.toLowerCase();
            if (agregar = "si") {
                camisetas(4)
            }
            break;
        case '6':
            agregar = prompt(`¿Quieres agregar ${productos[5].nombre} al carrito? "Si" o "No"`);
            agregar = agregar.toLowerCase();
            if (agregar = "si") {
                camisetas(5)
            }
        default:
            alert('Ingresa un numero del 1 al 6')
        }

    elegirCamiseta = prompt(`¿Quieres agregar al carrito otra camiseta? Escribí el numero de la elegida. \n \n 1. ${productos[0].nombre} \n 2. ${productos[1].nombre} \n 3. ${productos[2].nombre} \n 4. ${productos[3].nombre} \n 5. ${productos[4].nombre} \n 6. ${productos[5].nombre}\n Para finalizar compra escribe "ESC"`);
    elegirCamiseta = elegirCamiseta.toLowerCase();
}

const precioFinal = carrito.reduce((acc, el) => acc + el.precio, 0)

let finalizar = prompt(`El precio total final es de ${precioFinal}. \nPara finalizar la compra escribí "SI o "NO"`);
finalizar = finalizar.toLowerCase();

if (finalizar = "si") {
    alert(`Has comprado camisetas por ${precioFinal}. Gracias por tu compra master!`)
} else if (finalizar = "no") {
    alert(`Lamentamos que no hayas hecho la compra. Salu2`)
} else {
    alert("Ingresá una respuesta válida")
}








