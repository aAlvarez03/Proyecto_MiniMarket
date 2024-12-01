import { Producto } from "./Producto.js";
import { Carrito } from "./carrito.js";
import { cargarHeader } from "./header.js";

//URL
const url = "http://localhost:3000/muebles";

// Variable
let contenedorProductos = document.getElementById('productsContainer');

document.addEventListener("DOMContentLoaded", async () => {
    try {
      //Cargamos el header
      await cargarHeader();

      // Cargamos los productos
      cargarProductos();

      // Actualizamos la cabecera del carrito
      await Carrito.actualizarCabeceraCarrito();

    } catch (error) {
      console.log(error);
    }
  });


// Funcion para cargar productos
function cargarProductos() {
    fetch(url)
        .then(res => res.json())
        .then(respuesta => {

            for(let producto of respuesta){
                new Producto(producto.id, producto.titulo, producto.descripcion, producto.precio, producto.foto);

                contenedorProductos.appendChild(Producto.getDivFromProducto(producto));
            }
        })
        .catch(error => console.log(error));
}