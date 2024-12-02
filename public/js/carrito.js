import { DatabaseCarrito } from "./DatabaseCarrito.js";
import { Producto } from "./Producto.js";
import { cargarHeader } from "./header.js";



// evento para cargar el header
if(window.location.pathname.includes("carrito.html")){ // Si estamos en la pagina "carrito.html", entonces que se ejecute el evento
  document.addEventListener("DOMContentLoaded", async () => {
    try {
      // Cargamos el header
      await cargarHeader();

      //Cargamos los productos del carrito y generamos los tr
      const productosCarrito = await Carrito.cargarProductosCarrito();
      let carritoContainer = document.getElementById('tableContainer');

      for (let producto of productosCarrito) {
        let tr = Producto.getTrFromProductoDB(producto);
        carritoContainer.appendChild(tr);
      }

      // Actualizamos la cabecera del carrito
      await Carrito.actualizarCabeceraCarrito();

      
      //Actualizamos el precio total
      await Carrito.calcularPrecioTotal();
      
    } catch (error) {
      console.log(error);
    }
  });
}


export class Carrito{

    // Método para añadir productos al carrito
    static async aniadirProductoCarrito(producto){
        try{
          const DB = await DatabaseCarrito.openDatabase();
          let productoDB = {
            id: producto.id,
            titulo: producto.titulo,
            descripcion: producto.descripcion,
            precio: producto.precio,
            foto: producto.foto
          };
          let idInsertado = await DatabaseCarrito.insertProduct(DB, productoDB);
          console.log(`Producto añadido al carrito con ID: ${idInsertado}`);
          DB.close();

          //Actualizamos la cabecera
          await Carrito.actualizarCabeceraCarrito();

          //Actualizamos el precio total
          await Carrito.calcularPrecioTotal();

        } catch(error){
          console.log(error);
        }
    }

    // Método para cargar los productos del carrito
    static async cargarProductosCarrito(){
      try{
        const DB = await DatabaseCarrito.openDatabase();
        let productos = await DatabaseCarrito.getAllProducts(DB);
        console.log("Productos en el carrito: ", productos);
        DB.close();
        
        return productos;
      }catch(error){
        console.log("Error al cargar los productos del carrito: ", error);
        return [];
      }
    }

    // Método para eliminar un producto del carrito
    static async eliminarProductoCarrito(productoDB){
      try{
        const DB = await DatabaseCarrito.openDatabase();
        if(!productoDB.idDB){
          throw new Error("El producto no tiene un idDB valido")
        }
        await DatabaseCarrito.deleteProduct(DB, productoDB.idDB);
        console.log(`Producto con ID ${productoDB.idDB} eliminado del carrito`);
        DB.close();  

        // Obtengo la fila del producto a eliminar
        let fila = document.getElementById(`fila${productoDB.idDB}`);
        if(fila){
          fila.remove();
        }

        //Actualizamos el precio total
        await Carrito.calcularPrecioTotal();
        
        //Actualizamos la cabecera
        await Carrito.actualizarCabeceraCarrito();

        
        
      }catch(error){
        console.log('Error al eliminar el producto del carrito', error);        
      }
    }

    // Método para actualizar la cabecera del carrito
    static async actualizarCabeceraCarrito(){
      try{
        const DB = await DatabaseCarrito.openDatabase();
        let productos = await DatabaseCarrito.getAllProducts(DB);
        let cantidad = productos.length;
        DB.close();     
        
        let carritoHeader = document.getElementById("quantityProducts");
        carritoHeader.textContent = `(${cantidad})`;
      } catch(error){
        console.log("Error: ", error.message);
      }
    }

    // Método para calcular el precio total del carrito
    static async calcularPrecioTotal(){
      let tbody = document.getElementById("tableContainer");
      let filas = tbody.getElementsByTagName("tr");
      let total = 0;

      for(let i = 0; i < filas.length; i++){
        let celdas = filas[i].getElementsByTagName("td");

        let precioCelda = celdas[celdas.length - 1];
        let precio = parseFloat(precioCelda.textContent.trim());

        if(!isNaN(precio)){
          total += precio;
        }
      }

      //Actualizamos el tfoot
      let precioTotal = document.getElementById("totalPrice");
      precioTotal.textContent = `€${total.toFixed(2)}`;
    }
}