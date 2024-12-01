import { Carrito } from "./carrito.js";

export class Producto{
    constructor(id, titulo, descripcion, precio, foto){
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.precio = precio;
        this.foto = foto;
    }

    // Método estatico para generar el div del producto extraido del json
    static getDivFromProducto(producto){
        let card = document.createElement('div');
        card.classList.add('card', 'mb-3');
        let row = document.createElement('div');
        row.classList.add('row', 'g-0');
        let colImg = document.createElement('div');
        colImg.classList.add('col-md-4');
        colImg.innerHTML = `
            <img id="imagen${producto.id}" src="${producto.foto}" class="img-fluid rounded-start" alt="${producto.titulo}">
        `;

        row.append(colImg);

        let cardBodyContainer = document.createElement('div');
        cardBodyContainer.classList.add('col-md-8');

        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body')
        cardBody.innerHTML = `
            <h5 class="card-title" id="titulo${producto.id}">${producto.titulo}</h5>
            <p class="card-text" id="descripcion${producto.id}">${producto.descripcion}</p>
            <span class="priceText">Precio:</span>
            <span class="price" id="precio${producto.id}"> €${producto.precio}</span>
        `;

        let btn = document.createElement('button');
        btn.type = 'button';
        btn.id = `btn${producto.id}`;
        btn.classList.add('btn', 'btn-outline-dark');
        btn.textContent = 'Comprar';

        // Evento del boton comprar para añadir el producto al carrito
        btn.addEventListener("click", async () => {
            await Carrito.aniadirProductoCarrito(producto);
        })

        // Variable y evento para mostrar el popUp del producto añadido a la cesta
        let productoPopUp = document.getElementById('productAddPopUp');
        if(btn){
            const popUp = bootstrap.Toast.getOrCreateInstance(productoPopUp);
            btn.addEventListener("click", () => {
                popUp.show();
            })
        }

        cardBody.append(btn)
        cardBodyContainer.append(cardBody);
        row.append(cardBodyContainer);
        card.append(row);
        
        return card;        
    }

    // Método estatico para generar un tr con el producto que se va a mostrar en el carrito
    static getTrFromProductoDB(productoDB){
        let tr = document.createElement('tr');
        tr.id = `fila${productoDB.idDB}`;
        let tdProducto = document.createElement('td');
        tdProducto.id = `titulo${productoDB.id}`
        tdProducto.innerHTML = productoDB.titulo;
        let tdEliminar = document.createElement('td');
        let btnEliminar = document.createElement('button');
        btnEliminar.classList.add('btn');
        btnEliminar.classList.add('btn-outline-danger');
        btnEliminar.type = 'submit';
        btnEliminar.innerHTML = 'Eliminar';
        btnEliminar.id = `btn${productoDB.idDB}`;
        
        tdEliminar.append(btnEliminar);

        btnEliminar.addEventListener("click", async () => {
            await Carrito.eliminarProductoCarrito(productoDB);
        })

        let tdFoto = document.createElement('td');
        tdFoto.innerHTML = `
            <img width=200 id ="imagen${productoDB.id}" src="${productoDB.foto}" class="img-fluid rounded-start" alt="...">
        `
        let tdPrecio = document.createElement('td');
        tdPrecio.innerHTML = productoDB.precio;
        tdPrecio.id = `precio${productoDB.id}`

        tr.append(tdProducto);
        tr.append(tdEliminar);
        tr.append(tdFoto);
        tr.append(tdPrecio);

        return tr;
    }
}