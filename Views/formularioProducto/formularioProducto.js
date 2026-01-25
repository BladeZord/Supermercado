import { guardarProducto } from "../../Scripts/Producto/producto.js";


// Hacer la instancia del formulario
const form = document.getElementById("producto-form");

// Capturar el evento de tipo "submit"
form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Obtener los productos
    const producto = obtenerProductoDesdeFormulario();
    // Guardar el producto
    const ok = guardarProducto(producto);

    if (ok) {
        limpiarFormulario();
        alert("Producto guardado correctamente");
    } else {
        alert("Error al guardar el producto");
    }
});

function limpiarFormulario() {
    document.getElementById("producto-form").reset();
    document.getElementById("id").value = "";
}

/**
 * Obtener datos desde el formulario
 * @returns {any} objeto de retorno
 */
export function obtenerProductoDesdeFormulario() {
    return {
        id: obtenerNumero("id"),
        codigo_producto: obtenerTexto("codigo_producto"),
        nombre_producto: obtenerTexto("nombre_producto"),
        precio: obtenerNumero("precio"),
        existencia: obtenerNumero("existencia"),
    };
}

/**
 * Obtener texto o valor del input
 * @param {string} id
 * @returns {string} string de retorno
 */
export function obtenerTexto(id) {
    return document.getElementById(id).value.trim();
}

/**
 * obtiene numeros o valor del input
 * @param {string} producto
 * @returns {number} dato de retorno
 */
export function obtenerNumero(id) {
    const value = document.getElementById(id).value;
    return value ? Number(value) : null;
}
