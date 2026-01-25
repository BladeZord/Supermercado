/*
    Validadores genéricos
*/


/**
 * Valida que el texto sea válido
 * @param {string} texto, es el parametro de entrada
 * @returns {boolean}, es la respuesta
 */
export function validarTextoEntrada(texto) {
    // Validar nulos o indefinidos
    if (texto === null || texto === undefined) {
        return false;
    }

    // Validar que sea tipo de dato string
    if (typeof texto !== 'string') {
        return false;
    }

    // Validar el string valido no esté vacio
    if (texto.trim() === "") {
        return false;
    }

    return true;
}