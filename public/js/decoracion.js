import { Producto } from "./Producto.js";

//URL
const url = "http://localhost:3000/decoracion";

// Variable
let contenedorProductos = document.getElementById('productsContainer');

// evento para cargar el header
document.addEventListener("DOMContentLoaded", async () => {
    try {
      const headerContainer = document.getElementById("headerContainer");
      const response = await fetch("header.html");
      if(!response.ok) throw new Error("Hubo un error al cargar el header");
      let data = await response.text();
      headerContainer.innerHTML = data;
    } catch (error) {
      console.log(error);
    }
  });
// Evento para cargar los productos
document.addEventListener("DOMContentLoaded", cargarProductos);


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