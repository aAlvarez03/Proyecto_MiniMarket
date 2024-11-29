export class DatabaseCarrito{
    static openDatabase(){
        return new Promise((resolve, reject) =>{
            let openReq = indexedDB.open('Carrito', 1);
            openReq.addEventListener('upgradeneeded', e =>{
                console.log("db actualizada a v1");
                let db = e.target.result;
                if(!db.objectStoreName.contains('products')){
                    db.createObjectStore('products', {autoIncrement: true, keyPath: 'idDB'})
                }
            });

            openReq.addEventListener('success', e => {
                resolve(e.target.result);
            });
            openReq.addEventListener('error', e => reject("Error al abrir la DB"));
            openReq.addEventListener('blocked', e => reject("DB ya en uso"));
        });
    }

    static getAllProducts(db){
        return new Promise((resolve, reject) => {
            let store = db.transaction('product', 'readonly').objectStore('products');
            let getReq = store.All();
            // Si se obtiene todos los productos los devuelve
            getReq.addEventListener('success', e => resolve(e.target.result)); //OK
            getReq.addEventListener('error', e => reject('Error al obtener los productos'));
        });
    }

    static deleteDabase(){
        return new Promise((resolve, reject) => {
            let deleteReq = indexedDB.deleteDatabase('Carrito');
            deleteReq.addEventListener('success', e => resolve()); //Borrada
            deleteReq.addEventListener('error', e => reject("Error al borrar la BD"));
            deleteReq.addEventListener('blocked', e => reject("Debes cerrar la BD primero"));
        });
    }

    static getProduct(db, key){
        return new Promise((resolve, reject) => {
            let store = db.transaction('products', 'readonly').objectStore('products');
            let getReq = store.get(key);
            getReq.addEventListener('success', e => resolve(e.target.result)); //OK
            getReq.addEventListener('error', e => reject(`No se pudo recuperar el producto ${key}`));
        });
    }

    static insertProduct(db, producto){
        return new Promise((resolve, reject) => {
            let store = db.transaction('products', 'readwrite').objectStore('products');
            let addReq = store.add(producto);
            addReq.addEventListener('success', e => resolve(e.target.result)); // OK
            addReq.addEventListener('error', e => reject("No se puede añadir el producto"));
        });
    }

    static updateProduct(db, producto, key = null){
        return new Promise((resolve, reject) => {
            let store = db.transaction('products', 'readwrite').objectStore('products');
            //La key es necesaria cuando el almacen no tiene "keypath"
            let updateReq = key ? store.put(producto, key) : store.put(producto);
            updateReq.addEventListener('success', e => resolve(producto)); //Devuelve el producto
            updateReq.addEventListener('error', e => reject("No se pudo actualizar el producto"));
        })
    }

    static deleteProduct(db, key){
        return new Promise((resolve, reject) => {
            let store = db.transaction('products', 'readwrite').objectStore('products');
            let delReq = store.delete(key);
            delReq.addEventListener('success', e => resolve()); //OK
            delReq.addEventListener('error', e => reject(`No se pudo eliminar el producto con la key ${key}`));
        })
    }
}