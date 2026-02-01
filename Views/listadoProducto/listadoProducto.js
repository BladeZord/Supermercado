/**
 * Lógica de la lista de supermercado
 * - Agregar productos
 * - Marcar como comprado
 * - Eliminar
 * - Contadores y localStorage
 */

import {
  obtenerLista,
  agregarProducto,
  marcarComprado,
  eliminarDeLista,
  totalProductos,
  productosComprados,
  productosPendientes,
} from "../../Scripts/Lista/lista.js";

// Referencias a los elementos del DOM
const formAgregar = document.getElementById("form-agregar");
const inputNombre = document.getElementById("nombre-producto");
const inputCantidad = document.getElementById("cantidad-producto");
const mensajeError = document.getElementById("mensaje-error");
const listaProductos = document.getElementById("lista-productos");
const contTotal = document.getElementById("cont-total");
const contComprados = document.getElementById("cont-comprados");
const contPendientes = document.getElementById("cont-pendientes");

/**
 * Muestra un mensaje de error al usuario
 * @param {string} texto - mensaje a mostrar, si está vacío se oculta
 */
function mostrarError(texto) {
  if (!mensajeError) return;
  mensajeError.textContent = texto || "";
  mensajeError.style.display = texto ? "block" : "none";
}

/**
 * Valida el formulario: nombre no vacío y cantidad mayor que cero
 * @returns {boolean} true si es válido
 */
function validarFormulario() {
  const nombre = inputNombre ? inputNombre.value.trim() : "";
  const cantidad = inputCantidad ? Number(inputCantidad.value) : 0;

  if (nombre === "") {
    mostrarError("El nombre del producto no puede estar vacío.");
    return false;
  }

  if (!cantidad || cantidad < 1) {
    mostrarError("La cantidad debe ser mayor que cero.");
    return false;
  }

  mostrarError("");
  return true;
}

/**
 * Actualiza los contadores en pantalla (total, comprados, pendientes)
 */
function actualizarContadores() {
  const lista = obtenerLista();
  const total = totalProductos(lista);
  const comprados = productosComprados(lista);
  const pendientes = productosPendientes(lista);

  if (contTotal) contTotal.textContent = "Total: " + total;
  if (contComprados) contComprados.textContent = "Comprados: " + comprados;
  if (contPendientes) contPendientes.textContent = "Pendientes: " + pendientes;
}

/**
 * Crea un elemento <li> para un producto y lo devuelve
 * Incluye nombre, cantidad, botón marcar comprado y botón eliminar
 * @param {Object} item - { id, nombre, cantidad, comprado }
 * @returns {HTMLLIElement}
 */
function crearElementoProducto(item) {
  const li = document.createElement("li");
  li.setAttribute("data-id", item.id);

  // Si está comprado, le ponemos la clase para tachado/opacidad
  if (item.comprado) {
    li.classList.add("comprado");
  }

  const texto = document.createElement("span");
  texto.className = "texto-producto";
  texto.textContent = item.nombre + " x " + item.cantidad;

  const btnComprado = document.createElement("button");
  btnComprado.type = "button";
  btnComprado.className = "btn btn-comprado";
  btnComprado.textContent = item.comprado ? "Desmarcar" : "Comprado";

  const btnEliminar = document.createElement("button");
  btnEliminar.type = "button";
  btnEliminar.className = "btn btn-eliminar";
  btnEliminar.textContent = "Eliminar";

  li.appendChild(texto);
  li.appendChild(btnComprado);
  li.appendChild(btnEliminar);

  // Marcar como comprado (toggle)
  btnComprado.addEventListener("click", function () {
    const ok = marcarComprado(item.id);
    if (ok) {
      pintarLista();
      actualizarContadores();
    }
  });

  // Eliminar del DOM y de localStorage
  btnEliminar.addEventListener("click", function () {
    const ok = eliminarDeLista(item.id);
    if (ok) {
      li.remove();
      actualizarContadores();
    }
  });

  return li;
}

/**
 * Borra el contenido actual de la lista y la vuelve a pintar
 * con los datos de localStorage (para no repetir código al cargar y al agregar)
 */
function pintarLista() {
  if (!listaProductos) return;

  listaProductos.innerHTML = "";

  // Recuperamos la lista de localStorage por si cambió
  const lista = obtenerLista();

  if (lista.length === 0) {
    const vacio = document.createElement("li");
    vacio.className = "lista-vacia";
    vacio.textContent = "Sin productos aún. Agrega uno con el formulario.";
    listaProductos.appendChild(vacio);
    return;
  }

  for (let i = 0; i < lista.length; i++) {
    const item = lista[i];
    const li = crearElementoProducto(item);
    listaProductos.appendChild(li);
  }
}

/**
 * Envío del formulario: validar, agregar a la lista y volver a pintar
 */
formAgregar.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!validarFormulario()) {
    return;
  }

  const nombre = inputNombre.value.trim();
  const cantidad = Number(inputCantidad.value);

  const ok = agregarProducto(nombre, cantidad);

  if (ok) {
    inputNombre.value = "";
    inputCantidad.value = "1";
    pintarLista();
    actualizarContadores(); // actualizamos los numeros de total, comprados y pendientes
  } else {
    mostrarError("No se pudo agregar el producto.");
  }
});

// Al cargar la página: recuperar de localStorage y pintar la lista
pintarLista();
// Actualizamos los contadores para que coincidan con la lista
actualizarContadores();
