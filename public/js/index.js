import { Producto } from "./Producto.js";
import { Carrito } from "./carrito.js";
import { cargarHeader } from "./header.js";

// Variables
let contenedorProductos = document.getElementById("productsContainer");

// evento para cargar el header
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Cargamos el header
    await cargarHeader();

    // Cargamos los productos
    await cargarProductos();

    // Actualizamos la cabecera del carrito
    await Carrito.actualizarCabeceraCarrito();
    
  } catch (error) {
    console.log(error);
  }
});

// Funcion para cargar productos aleatorios
async function cargarProductos() {
    const categorias = ['electronica', 'muebles', 'decoracion'];
    try{
        // Obtenemos los datos de las categorias
        let productosPorCategoria = await Promise.all(
            categorias.map(async categoria => {
                const response = await fetch(`http://localhost:3000/${categoria}`);
                if(!response.ok) throw new Error("Hubo en error al cargar la categoria");
                return await response.json();                
            })
        );

        // Seleccionamos un producto aleatorio de cada categoria
        productosPorCategoria.forEach((productos, index) => {
            let productoAleatorio = productos[Math.floor(Math.random() * productos.length)];

            if(productoAleatorio){
                    new Producto(
                    productoAleatorio.id,
                    productoAleatorio.titulo,
                    productoAleatorio.descripcion,
                    productoAleatorio.precio,
                    productoAleatorio.foto
                );

                contenedorProductos.appendChild(Producto.getDivFromProducto(productoAleatorio));
            }else{
                console.log(`No hay productos disponibles en la categoria ${categorias[index]}`)
            }
        })
    }catch(error){
        console.log(error);
    }
}
