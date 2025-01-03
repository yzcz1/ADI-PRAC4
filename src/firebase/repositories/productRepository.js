import { db } from '../config/firebaseConfig';
import { doc, collection, query, getDoc, getDocs, setDoc, addDoc, deleteDoc, orderBy, limit, startAfter } from 'firebase/firestore';

/**
 * Obtener productos con paginación.
 * @param {number} limite - Número de productos por página.
 * @param {DocumentSnapshot} lastVisible - Último producto visible en la página anterior.
 * @returns {object} Lista de productos y el último documento.
 */
async function getProductos(limite = 6, lastVisible = null) {
    let productosQuery = query(
        collection(db, "productos"),
        orderBy("nombre", "asc"),
        limit(limite)
    );

    if (lastVisible) {
        productosQuery = query(productosQuery, startAfter(lastVisible));
    }

    let snapshot = await getDocs(productosQuery);
    let productos = snapshot.docs.map(product => {
        return {
            id: product.id,
            ...product.data()
        };
    });

    let lastDoc = snapshot.docs[snapshot.docs.length - 1];
    return { productos, lastVisible: lastDoc };
}

/**
 * Crear un nuevo producto.
 * @param {string} nombre
 * @param {string} categoria
 * @param {number} precio
 * @param {string} descripcion
 * @param {string} imagen
 * @returns {object} El producto creado.
 */
async function addProducto(nombre, categoria, precio, descripcion, imagen) {
    let nuevoProducto = {
        nombre: nombre,
        categoria: categoria,
        precio: precio,
        descripcion: descripcion,
        imagen: imagen
    };

    let newRef = await addDoc(collection(db, "productos"), nuevoProducto);
    return { id: newRef.id, ...nuevoProducto };
}

/**
 * Actualizar un producto.
 * @param {string} id - ID del producto.
 * @param {object} data - Datos a actualizar.
 */
async function updateProducto(id, data) {
    let productoRef = doc(db, "productos", id);
    await setDoc(productoRef, data, { merge: true });
}

/**
 * Eliminar un producto.
 * @param {string} id - ID del producto.
 */
async function deleteProducto(id) {
    let productoRef = doc(db, "productos", id);
    await deleteDoc(productoRef);
}

/**
 * Obtener un producto por su ID.
 * @param {string} id - ID del producto.
 * @returns {object} El producto obtenido.
 */
async function obtenerProducto(id) {
    const productoRef = doc(db, "productos", id);
    const productoSnap = await getDoc(productoRef);

    if (!productoSnap.exists()) {
        throw new Error("Producto no encontrado");
    }

    return { id: productoSnap.id, ...productoSnap.data() };
}

export { getProductos, addProducto, updateProducto, deleteProducto, obtenerProducto };
