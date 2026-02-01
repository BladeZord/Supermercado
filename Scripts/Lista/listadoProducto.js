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
  actualizarProducto,
  marcarComprado,
  eliminarDeLista,
  totalProductos,
  productosComprados,
  productosPendientes,
} from "./lista.js";

// Referencias a los elementos del DOM
const formAgregar = document.getElementById("form-agregar");
const inputNombre = document.getElementById("nombre-producto");
const inputCantidad = document.getElementById("cantidad-producto");
const inputPrecio = document.getElementById("precio-producto");
const mensajeError = document.getElementById("mensaje-error");
const listaProductos = document.getElementById("lista-productos");
const contTotal = document.getElementById("cont-total");
const contComprados = document.getElementById("cont-comprados");
const contPendientes = document.getElementById("cont-pendientes");
const inputIdProducto = document.getElementById("producto-id");
const btnEnviar = document.getElementById("btn-agregar");
const btnCancelar = document.getElementById("btn-cancelar");

/** ID del producto que se está editando (null = modo agregar) */
let idEditando = null;

/** Vuelve al modo agregar y limpia el formulario */
function cancelarEdicion() {
  idEditando = null;
  if (inputIdProducto) inputIdProducto.value = "";
  if (btnEnviar) btnEnviar.textContent = "Agregar";
  if (btnCancelar) btnCancelar.style.display = "none";
  inputNombre.value = "";
  inputCantidad.value = "1";
  inputPrecio.value = "0";
  mostrarError("");
}

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
 * Crea una fila <tr> para un producto y la devuelve
 * Incluye celdas: nombre, cantidad, precio, estado (Comprado), acciones (Eliminar)
 * @param {Object} item - { id, nombre, cantidad, precio, comprado }
 * @returns {HTMLTableRowElement}
 */
function crearFilaProducto(item) {
  const tr = document.createElement("tr");
  tr.setAttribute("data-id", item.id);

  if (item.comprado) {
    tr.classList.add("comprado");
  }

  const tdNombre = document.createElement("td");
  tdNombre.className = "texto-producto";
  tdNombre.textContent = item.nombre;

  const tdCantidad = document.createElement("td");
  tdCantidad.textContent = item.cantidad;

  const tdPrecio = document.createElement("td");
  tdPrecio.textContent = item.precio != null ? item.precio : "-";

  const tdEstado = document.createElement("td");
  const btnComprado = document.createElement("button");
  btnComprado.type = "button";
  btnComprado.className = "btn btn-comprado";
  btnComprado.textContent = item.comprado ? "Desmarcar" : "Comprado";

  const tdAcciones = document.createElement("td");
  const btnEliminar = document.createElement("button");
  btnEliminar.type = "button";
  btnEliminar.className = "btn btn-eliminar";
  btnEliminar.textContent = "Eliminar";

  const btnEditar = document.createElement("button");
  btnEditar.type = "button";
  btnEditar.className = "btn btn-editar";
  btnEditar.textContent = "Editar";

  tdEstado.appendChild(btnComprado);
  tdAcciones.appendChild(btnEliminar);
  tdAcciones.appendChild(btnEditar);

  tr.appendChild(tdNombre);
  tr.appendChild(tdCantidad);
  tr.appendChild(tdPrecio);
  tr.appendChild(tdEstado);
  tr.appendChild(tdAcciones);

  btnComprado.addEventListener("click", function () {
    const ok = marcarComprado(item.id);
    if (ok) {
      pintarLista();
      actualizarContadores();
    }
  });

  btnEliminar.addEventListener("click", function () {
    const ok = eliminarDeLista(item.id);
    if (ok) {
      tr.remove();
      actualizarContadores();
    }
  });

  btnEditar.addEventListener("click", function () {
    idEditando = item.id;
    inputNombre.value = item.nombre;
    inputCantidad.value = item.cantidad;
    inputPrecio.value = item.precio != null ? item.precio : "";
    if (inputIdProducto) inputIdProducto.value = item.id;
    if (btnEnviar) btnEnviar.textContent = "Guardar cambios";
  });

  return tr;
}

/**
 * Borra el contenido actual del tbody y lo vuelve a pintar
 * con los datos de localStorage
 */
function pintarLista() {
  if (!listaProductos) return;

  listaProductos.innerHTML = "";

  const lista = obtenerLista();

  if (lista.length === 0) {
    const trVacio = document.createElement("tr");
    const tdVacio = document.createElement("td");
    tdVacio.setAttribute("colspan", "5");
    tdVacio.className = "lista-vacia";
    tdVacio.textContent = "Sin productos aún. Agrega uno con el formulario.";
    trVacio.appendChild(tdVacio);
    listaProductos.appendChild(trVacio);
    return;
  }

  for (let i = 0; i < lista.length; i++) {
    const item = lista[i];
    const tr = crearFilaProducto(item);
    listaProductos.appendChild(tr);
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
  const precio = inputPrecio.value !== "" ? Number(inputPrecio.value) : 0;

  let ok = false;
  if (idEditando != null) {
    ok = actualizarProducto(idEditando, nombre, cantidad, precio);
  } else {
    ok = agregarProducto(nombre, cantidad, precio);
  }

  if (ok) {
    cancelarEdicion();
    pintarLista();
    actualizarContadores();
  } else {
    mostrarError(idEditando != null ? "No se pudo actualizar el producto." : "No se pudo agregar el producto.");
  }
});

if (btnCancelar) {
  btnCancelar.addEventListener("click", cancelarEdicion);
}

pintarLista();
actualizarContadores();
