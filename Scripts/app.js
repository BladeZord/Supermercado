import { renderizadorFooter } from "../Components/Footer/footer.js";
import { renderHeader } from "../Components/Header/header.js";
import { renderProductoForm } from "../Components/ProductoForm/formulario.js";
import { renderProductoList } from "../Components/ProductoList/listado.js";

const STORAGE_KEY = "supermercado_productos";

document.addEventListener("DOMContentLoaded", async () => {
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");
  const formContainer = document.getElementById("productoForm");
  const listContainer = document.getElementById("productoList");

  // Layout (componentes)
  await renderHeader(header);
  await renderizadorFooter(footer);

  // Estado simple (sin framework)
  let productos = cargarProductos();

  const listado = await renderProductoList(listContainer, {
    productos,
    onEliminarProducto: (id) => {
      productos = productos.filter((p) => String(p.id) !== String(id));
      guardarProductos(productos);
      listado?.pintar?.(productos);
    },
    onLimpiar: () => {
      productos = [];
      guardarProductos(productos);
      listado?.pintar?.(productos);
    },
  });

  await renderProductoForm(formContainer, {
    onAgregarProducto: ({ nombre, cantidad }) => {
      const nuevo = {
        id: crearId(),
        nombre,
        cantidad,
      };
      productos = [nuevo, ...productos];
      guardarProductos(productos);
      listado?.pintar?.(productos);
    },
  });
});

function crearId() {
  // crypto.randomUUID() es lo ideal, pero dejamos fallback
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function cargarProductos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    // Normaliza estructura mínima
    return parsed
      .filter((p) => p && typeof p === "object")
      .map((p) => ({
        id: p.id ?? crearId(),
        nombre: String(p.nombre ?? "").trim(),
        cantidad: Number(p.cantidad ?? 1),
      }))
      .filter((p) => p.nombre && Number.isFinite(p.cantidad) && p.cantidad > 0);
  } catch {
    return [];
  }
}

function guardarProductos(productos) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(productos));
  } catch (error) {
    console.warn("No se pudo guardar en localStorage:", error);
  }
}

