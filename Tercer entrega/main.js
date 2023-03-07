let css = document.querySelector("h3");
let color1 = document.querySelector(".color1");
let color2 = document.querySelector(".color2");
let body = document.getElementById("gradient");

color1.addEventListener("input", setGradient);

color2.addEventListener("input", setGradient);

class Producto {
    constructor(id, nombre, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = Math.round(precio*1.21); 
        this.img = img;
        this.cantidad = 1;
    }
}

const modena = new Producto(1,"Modena", 17000, "Imagenes/modena.jpg");
const venecia = new Producto(2,"Venecia", 15000, "Imagenes/venecia.jpg");
const comodo = new Producto(3,"Comodo", 13500, "Imagenes/comodo.jpg");
const mega = new Producto(4,"Mega", 16499, "Imagenes/mega.jpg");

const productos = [modena, venecia, comodo, mega];

let carrito = [];

if(localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

const contenedorProductos = document.getElementById("contenedorProductos");


const mostrarProductos = () => {
    productos.forEach( producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML = `
                <div class = "card" >
                    <img src = "${producto.img}" class = "card-img-tom imgProductos">    
                    <div class = "card-body" >
                        <h2> ${producto.nombre} </h2>
                        <p> ${producto.precio} </p>
                        <button class = "btn colorBoton" id = "boton${producto.id}" >Agregar al Carrito</button>
                    </div>
                </div>`

        contenedorProductos.appendChild(card);

        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
        })
    })
}

mostrarProductos();


const agregarAlCarrito = (id) => {
    const productoEnCarrito = carrito.find(producto => producto.id === id);
    if(productoEnCarrito) {
        productoEnCarrito.cantidad++;
    }else {
        const producto = productos.find(producto => producto.id === id);
        carrito.push(producto);
    }
    calcularTotal();

    localStorage.setItem("carrito", JSON.stringify(carrito));
}


const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML = `
                <div class = "card" >
                    <img src = "${producto.img}" class = "card-img-tom imgProductos">    
                    <div class = "card-body" >
                        <h2> ${producto.nombre} </h2>
                        <p> ${producto.precio} </p>
                        <p> ${producto.cantidad} </p>
                    </div>
                    <div class="producto">
                        <div class="botones">
                            <i class="fas fa-minus-circle"></i>
                            <span class="cantidad"></span>
                            <i class="fas fa-plus-circle"></i>
                        </div>
                    </div>
                    <button class = "btn colorBoton" id="eliminar${producto.id}" > Eliminar</button>
                </div>`

        contenedorCarrito.appendChild(card);

        const botonesRestar = document.querySelectorAll('.fa-minus-circle');
        const botonesSumar = document.querySelectorAll('.fa-plus-circle');
        const cantidades = document.querySelectorAll('.cantidad');

        for (let i = 0; i < botonesRestar.length; i++) {
        botonesRestar[i].addEventListener('click', () => {
            if (carrito[i].cantidad > 1) {
            carrito[i].cantidad--;
            cantidades[i].textContent = carrito[i].cantidad;
            } else {
            carrito.splice(i, 1);
            mostrarCarrito();
            }
        });
  
  botonesSumar[i].addEventListener('click', () => {
    carrito[i].cantidad++;
    cantidades[i].textContent = carrito[i].cantidad;
  });
}

        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
        })
    })
    calcularTotal();
}


const eliminarDelCarrito = (id) => {
    const producto = carrito.find(producto => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice,1);
    mostrarCarrito();

    localStorage.setItem("carrito", JSON.stringify(carrito));
}


const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})

const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();

    localStorage.clear();
}


const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0; 
    carrito.forEach( producto => {
        totalCompra += producto.precio * producto.cantidad;
    })
    total.innerHTML = `Total $${totalCompra}`;
}



function setGradient() {
	body.style.background = 
	"linear-gradient(to right, " 
	+ color1.value 
	+ ", " 
	+ color2.value 
	+ ")";

	css.textContent = body.style.background + ";";
}