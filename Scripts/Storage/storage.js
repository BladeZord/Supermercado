/**
 * Manejo de localStorage
 */

import { validarTextoEntrada } from "../Utils/inputValidator.js";

export const STORAGE_KEY = {
    Listado: "listado",
    Capturado: "capturado",
    Id: "id",
};

/**
 * Guarda un valor en localStorage
 * @param {string} clave - Key del localStorage
 * @param {any} valor - Valor a guardar (objeto, array, string, etc.)
 * @returns {boolean} - true si se guardó correctamente
 */
export function guardarElementoEnStorage(clave, valor) {
    if (!validarTextoEntrada(clave)) {
        console.error("Clave inválida");
        return false;
    }

    try {
        localStorage.setItem(clave, JSON.stringify(valor));
        return true;
    } catch (error) {
        console.error("Error al guardar en localStorage", error);
        return false;
    }
}


/**
 * Obtiene un valor desde localStorage
 * @param {string} clave - Key del localStorage
 * @param {any} valorPorDefecto - Valor por defecto si no existe
 * @returns {any}
 */
export function accederElementoEnStorage(clave, valorPorDefecto = null) {
    if (!validarTextoEntrada(clave)) {
        console.error("Clave inválida");
        return valorPorDefecto;
    }

    try {
        const data = localStorage.getItem(clave);
        return data !== null ? JSON.parse(data) : valorPorDefecto;
    } catch (error) {
        console.error("Error al leer localStorage:", error);
        return valorPorDefecto;
    }
}
