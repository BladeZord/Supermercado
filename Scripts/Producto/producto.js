import {
    guardarElementoEnStorage,
    accederElementoEnStorage,
    STORAGE_KEY
} from "../Storage/storage.js";

/**
 * Guarda o actualiza un producto
 * @param {Object} producto
 * @returns {boolean}
 */
export function guardarProducto(producto) {
    if (!producto) return false;

    const listado = accederElementoEnStorage(STORAGE_KEY.Listado, []);

    // ACTUALIZAR
    if (producto.id && producto.id > 0) {
        const index = listado.findIndex(p => p.id === producto.id);
        if (index === -1) return false;

        listado[index] = { ...producto };
    }
    // CREAR
    else {
        const nuevoId = generarNuevoId(listado);
        producto.id = nuevoId;
        listado.push(producto);
    }

    return guardarElementoEnStorage(STORAGE_KEY.Listado, listado);
}

/**
 * Obtiene el listado completo de productos
 * @returns {Array}
 */
export function obtenerlistadoProducto() {
    return accederElementoEnStorage(STORAGE_KEY.Listado, []);
}

/**
 * Busca un producto por ID
 * @param {number} id
 * @returns {Object|null}
 */
export function encontrarPorIdProducto(id) {
    if (!id) return null;

    const listado = accederElementoEnStorage(STORAGE_KEY.Listado, []);
    return listado.find(p => p.id === id) || null;
}

/**
 * Elimina un producto por ID
 * @param {number} id
 * @returns {boolean}
 */
export function eliminarProducto(id) {
    if (!id) return false;

    const listado = accederElementoEnStorage(STORAGE_KEY.Listado, []);
    const nuevoListado = listado.filter(p => p.id !== id);

    if (listado.length === nuevoListado.length) {
        return false; // no se eliminó nada
    }

    return guardarElementoEnStorage(STORAGE_KEY.Listado, nuevoListado);
}

/**
 * Genera un ID autoincremental
 * @param {Array} listado
 * @returns {number}
 */
function generarNuevoId(listado) {
    if (!listado.length) return 1;
    return Math.max(...listado.map(p => p.id)) + 1;
}
