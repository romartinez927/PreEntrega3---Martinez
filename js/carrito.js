let productosEnCarrito = JSON.parse(localStorage.getItem("productosCarrito"))
const contenedorCarrito = document.getElementById("contenedorCarrito")
const montoTotalCompra = document.getElementById("montoTotal")
const contenedorCarritoVacio = document.getElementById("carritoVacio")

//Función para visualizar los productos que se encuentran en el carrito
const verCarrito = () => {

    contenedorCarrito.innerHTML = ""

    if (productosEnCarrito && productosEnCarrito.length > 0) {
        
        contenedorCarritoVacio.innerText = ""

        productosEnCarrito.forEach( (producto) => {
            let contenidoDelCarrito = document.createElement("div")
            contenidoDelCarrito.className = "contenidoDelCarrito"
            contenidoDelCarrito.innerHTML = `
                <img src="${producto.img}">
                <h3>${producto.nombre}</h3>
                <p>$ ${producto.precio}</p>
                <p>Cantidad: ${producto.cantidad}</p> 
                <p>Total: $${producto.cantidad * producto.precio}</p>
                <span class="eliminarProducto"> (x) </span>
                `
            
            contenedorCarrito.append(contenidoDelCarrito)
    
    
            let eliminar = contenidoDelCarrito.querySelector(".eliminarProducto") 
    
            eliminar.addEventListener("click", () => {
                eliminarProducto(producto.id)
            })
    
        })    
    } else {
        contenedorCarritoVacio.innerText = "Tu carrito se encuentra vacío."
        montoTotalCompra.innerHTML = ""
    }
    
}

//Eliminar productos
const eliminarProducto = (id) => {
    const index = productosEnCarrito.findIndex((element) => element.id === id)

    productosEnCarrito.splice(index, 1)
    verCarrito()

    localStorage.setItem("productosCarrito", JSON.stringify(productosEnCarrito))
   
} 

verCarrito()

// Cálculo del precio total
if (productosEnCarrito.length > 0) {
    const total = productosEnCarrito.reduce ((acc, el) =>
        acc + el.precio * el.cantidad, 0)

    const totalCompra = document.createElement("div")
    totalCompra.className = "total-content"
    totalCompra.innerHTML = `Total a pagar: $ ${total}`
    montoTotalCompra.append(totalCompra)
} else {
    montoTotalCompra.innerHTML = ""
}



