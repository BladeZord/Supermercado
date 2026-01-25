import { validarTextoEntrada } from "../Validadores/inputValidator.js";


/**
 * Obtiene el elemento del DOM basado en el nombre
 * @param {string} elementoId, es el parametro de entrada
 * @returns {HTMLElement}, es la respuesta
 */
export function obtenerElementosHtmlPorId(elementoId) {
  if (!validarTextoEntrada(elementoId)) {
    return null;
  }

  const elemento = document.getElementById(elementoId);

  if (!elemento) {
    console.warn(`Elemento con id "${elementoId}" no encontrado en el DOM`);
    return null;
  }

  return elemento;
}

/**
 * Crea un elemento HTML con contenido de texto
 * @param {string} elemento - etiqueta HTML (puede ser: div, p, span, etc.)
 * @param {string} contenido - texto del elemento
 * @returns {HTMLElement}
 */
export function crearElementoHtml(elemento, contenido, className) {
  const el = document.createElement(elemento);
  el.textContent = contenido;
  if (className) el.className = className;
  
  return el;
}
