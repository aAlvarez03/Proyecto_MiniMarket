import { DatabaseCarrito } from "./DatabaseCarrito.js";

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

document.addEventListener("DOMContentLoaded", async() => {
    let DB = await DatabaseCarrito.openDatabase();

    //Mostramos todos los productos
    let productos = await DatabaseCarrito.getAllProducts(DB);
    console.log(productos);

    DB.close();
})


export class Carrito{
    static async aniadirProductoCarrito(producto){
        DatabaseCarrito.openDatabase()
            .then(db => {
                
            })
            .catch(error => console.log(error));
    }
}