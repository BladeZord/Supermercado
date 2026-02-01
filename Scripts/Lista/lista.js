/**
 * Lista de supermercado - manejo de items
 * Cada item tiene: id, nombre, cantidad, comprado
 */

import {
  guardarElementoEnStorage,
  accederElementoEnStorage,
} from "../Storage/storage.js";

// clave donde guardamos la lista en localStorage (investigado: localStorage guarda strings)
const CLAVE_LISTA = "listaSupermercado";

/**
 * Obtiene toda la lista desde localStorage
 * @returns {Array} array de items { id, nombre, cantidad, comprado }
 */
export function obtenerLista() {
  const datos = accederElementoEnStorage(CLAVE_LISTA, []);
  if (!Array.isArray(datos)) return [];
  return datos;
}

/**
 * Guarda la lista en localStorage
 * @param {Array} lista
 * @returns {boolean}
 */
function guardarLista(lista) {
  if (!Array.isArray(lista)) return false;
  return guardarElementoEnStorage(CLAVE_LISTA, lista);
}

/**
 * Genera un id nuevo para no repetir
 * @param {Array} lista
 * @returns {number}
 */
function nuevoId(lista) {
  if (!lista || lista.length === 0) return 1;
  const ids = lista.map((item) => Number(item.id)).filter((n) => n > 0);
  if (ids.length === 0) return 1;
  return Math.max(...ids) + 1;
}

/**
 * Agrega un producto a la lista
 * @param {string} nombre
 * @param {number} cantidad
 * @returns {boolean} true si se guardó bien
 */
export function agregarProducto(nombre, cantidad) {
  const lista = obtenerLista();
  const id = nuevoId(lista);
  lista.push({
    id: id,
    nombre: String(nombre).trim(),
    cantidad: Number(cantidad),
    comprado: false,
  });
  return guardarLista(lista);
}

/**
 * Marca un producto como comprado o pendiente (toggle)
 * @param {number} id
 * @returns {boolean}
 */
export function marcarComprado(id) {
  const lista = obtenerLista();
  const item = lista.find((p) => Number(p.id) === Number(id));
  if (!item) return false;
  item.comprado = !item.comprado;
  return guardarLista(lista);
}

/**
 * Elimina un producto de la lista
 * @param {number} id
 * @returns {boolean}
 */
export function eliminarDeLista(id) {
  const lista = obtenerLista();
  const nuevaLista = lista.filter((p) => Number(p.id) !== Number(id));
  if (nuevaLista.length === lista.length) return false;
  return guardarLista(nuevaLista);
}

/**
 * Cuenta total de productos en la lista
 * @param {Array} lista (opcional, si no se pasa usa la guardada)
 * @returns {number}
 */
export function totalProductos(lista) {
  const l = lista !== undefined ? lista : obtenerLista();
  return l.length;
}

/**
 * Cuenta cuántos están comprados
 * @param {Array} lista (opcional)
 * @returns {number}
 */
export function productosComprados(lista) {
  const l = lista !== undefined ? lista : obtenerLista();
  return l.filter((p) => p.comprado === true).length;
}

/**
 * Cuenta cuántos están pendientes
 * @param {Array} lista (opcional)
 * @returns {number}
 */
export function productosPendientes(lista) {
  const l = lista !== undefined ? lista : obtenerLista();
  return l.filter((p) => !p.comprado).length;
}
