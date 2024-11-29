export class Producto{
    constructor(id, titulo, descripcion, precio, foto){
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.precio = precio;
        this.foto = foto;
    }

    static getDivFromProducto(producto){
        let card = document.createElement('div');
        card.classList.add('card');
        card.classList.add('mb-3');
        let row = document.createElement('div');
        row.classList.add('row');
        row.classList.add('g-0');
        let colImg = document.createElement('div');
        colImg.classList.add('col-md-4');
        colImg.innerHTML = `
            <img id="${this.id}" src="${producto.foto}" class="img-fluid rounded-start" alt="...">
        `;

        row.append(colImg);

        let cardBodyContainer = document.createElement('div');
        cardBodyContainer.classList.add('col-md-8');

        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body')
        cardBody.innerHTML = `
            <h5 class="card-title" id="${this.id}">${producto.titulo}</h5>
            <p class="card-text" id="${this.id}">${producto.descripcion}</p>
            <span class="priceText">Precio:</span>
            <span class="price" id="${this.id}"> €${producto.precio}</span>
            <button type="button" id="${this.id}" class="btn btn-secondary">Comprar</button>
        `;

        cardBodyContainer.append(cardBody);
        row.append(cardBodyContainer);
        card.append(row);
        
        return card;        
    }

    static getTrFromProductoDB(productoDB){
        let tr = document.createElement('tr');
        let tdProducto = document.createElement('td');
        tdProducto.innerHTML = productoDB.titulo;
        let tdEliminar = document.createElement('button');
        tdEliminar.classList.add('btn');
        tdEliminar.classList.add('btn-danger');
        tdEliminar.type = 'submit';
        tdEliminar.innerHTML = 'Eliminar';
        let tdFoto = document.createElement('td');
        tdFoto.innerHTML = `
            <img id ="${this.id}" src="${productoDB.foto}" class="img-fluid rounded-start" alt="...">
        `
        let tdPrecio = document.createElement('td');
        tdPrecio.innerHTML = productoDB.precio;

        tr.append(tdProducto);
        tr.append(tdEliminar);
        tr.append(tdFoto);
        tr.append(tdPrecio);

        return tr;
    }
}