import {
    guardarElementoEnStorage,
    accederElementoEnStorage,
    STORAGE_KEY
} from "../Storage/storage.js";

/**
 * Modelo => ProductoModel
 * id
 * codigo_producto
 * nombre_producto
 * precio
 * existencia  
 

/**
 * Guarda o actualiza un producto
 * @param {Object} producto
 * @returns {boolean}
 */
export function guardarProducto(producto) {
    if (!producto) return false;
    const listado = normalizarListado(accederElementoEnStorage(STORAGE_KEY.Listado, []));

    if (!validarProducto(producto)) {
        return false;
    }

    // ACTUALIZAR
    if (producto.id && producto.id > 0) {
        const idNum = Number(producto.id);
        const index = listado.findIndex(p => Number(p.id) === idNum);
        if (index === -1) return false;

        listado[index] = { ...producto, id: idNum };
    }
    // CREAR
    else {
        const nuevoId = generarNuevoId(listado);
        listado.push({ ...producto, id: nuevoId });
    }

    return guardarElementoEnStorage(STORAGE_KEY.Listado, listado);
}

/**
 * Obtiene el listado completo de productos
 * @returns {Array}
 */
export function obtenerlistadoProducto() {
    return normalizarListado(accederElementoEnStorage(STORAGE_KEY.Listado, []));
}

/**
 * Busca un producto por ID
 * @param {number} id
 * @returns {Object|null}
 */
export function encontrarPorIdProducto(id) {
    if (!id) return null;

    const listado = normalizarListado(accederElementoEnStorage(STORAGE_KEY.Listado, []));
    const idNum = Number(id);
    return listado.find(p => Number(p.id) === idNum) || null;
}

/**
 * Elimina un producto por ID
 * @param {number} id
 * @returns {boolean}
 */
export function eliminarProducto(id) {
    if (!id) return false;

    const listado = normalizarListado(accederElementoEnStorage(STORAGE_KEY.Listado, []));
    const idNum = Number(id);
    const nuevoListado = listado.filter(p => Number(p.id) !== idNum);

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
    const ids = (Array.isArray(listado) ? listado : [])
        .map(p => Number(p?.id))
        .filter(n => Number.isFinite(n) && n > 0);

    return ids.length ? Math.max(...ids) + 1 : 1;
}

function normalizarListado(valor) {
    if (!Array.isArray(valor)) return [];
    return valor.filter(p => p && typeof p === "object" && !Array.isArray(p));
}

function validarProducto(producto) {
    if (!producto || typeof producto !== "object") return false;

    const codigo = String(producto.codigo_producto ?? "").trim();
    const nombre = String(producto.nombre_producto ?? "").trim();
    if (producto.precio === null || producto.precio === undefined) return false;
    if (producto.existencia === null || producto.existencia === undefined) return false;

    const precio = Number(producto.precio);
    const existencia = Number(producto.existencia);

    if (!codigo) return false;
    if (!nombre) return false;
    if (!Number.isFinite(precio) || precio < 0) return false;
    if (!Number.isFinite(existencia) || existencia < 0) return false;

    return true;
}
