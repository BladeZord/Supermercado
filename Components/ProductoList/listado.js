import { obtenerElementosHtmlPorId } from "../../Scripts/Dom/dom.js";

/*
  Componente Listado
  Renderiza productos y delega acciones (eliminar / limpiar) vía callbacks
*/
export async function renderProductoList(
  container,
  { productos = [], onEliminarProducto, onLimpiar } = {}
) {
  try {
    if (!container) return null;

    const response = await fetch("./Components/ProductoList/listado.html");
    const html = await response.text();
    container.innerHTML = html;

    const tbody = obtenerElementosHtmlPorId("productos_tbody");
    const empty = obtenerElementosHtmlPorId("productos_empty");

    const pintar = (productosActuales) => {
      if (!tbody || !empty) return;
      tbody.innerHTML = "";

      if (!Array.isArray(productosActuales) || productosActuales.length === 0) {
        empty.hidden = false;
        return;
      }

      empty.hidden = true;

      for (const p of productosActuales) {
        const tr = document.createElement("tr");

        const tdNombre = document.createElement("td");
        tdNombre.textContent = p.nombre;

        const tdCantidad = document.createElement("td");
        tdCantidad.className = "col-num";
        tdCantidad.textContent = String(p.cantidad);

        const tdAcciones = document.createElement("td");
        tdAcciones.className = "col-actions";

        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn btn-danger btn-sm";
        btn.textContent = "Eliminar";
        btn.dataset.action = "delete";
        btn.dataset.id = String(p.id);

        tdAcciones.append(btn);

        tr.append(tdNombre, tdCantidad, tdAcciones);
        tbody.append(tr);
      }
    };

    // Delegación de eventos (evita rebind por re-render)
    container.addEventListener("click", (e) => {
      const el = e.target?.closest?.("[data-action]");
      if (!el) return;

      const action = el.dataset.action;
      if (action === "delete") {
        const id = el.dataset.id;
        if (id) onEliminarProducto?.(id);
        return;
      }

      if (action === "clear") {
        onLimpiar?.();
      }
    });

    pintar(productos);
    return { pintar };
  } catch (error) {
    console.error("Error al renderizar el listado:", error);
    return null;
  }
}
