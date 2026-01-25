import { obtenerElementosHtmlPorId } from "../../Scripts/Dom/dom.js";
import { validarTextoEntrada } from "../../Scripts/Validadores/inputValidator.js";

/*
  Componente Formulario
  Emite el evento "agregar producto" mediante callback
*/
export async function renderProductoForm(container, { onAgregarProducto } = {}) {
  try {
    if (!container) return null;

    const response = await fetch("./Components/ProductoForm/formulario.html");
    const html = await response.text();
    container.innerHTML = html;

    const form = obtenerElementosHtmlPorId("producto_form");
    const nombre = obtenerElementosHtmlPorId("producto_nombre");
    const cantidad = obtenerElementosHtmlPorId("producto_cantidad");
    const errorBox = obtenerElementosHtmlPorId("producto_error");

    if (!form || !nombre || !cantidad) return null;

    const setError = (msg) => {
      if (!errorBox) return;
      if (!msg) {
        errorBox.hidden = true;
        errorBox.textContent = "";
        return;
      }
      errorBox.hidden = false;
      errorBox.textContent = msg;
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombreValue = nombre.value?.trim?.() ?? "";
      const cantidadValue = Number(cantidad.value);

      if (!validarTextoEntrada(nombreValue)) {
        setError("El nombre del producto es obligatorio.");
        nombre.focus();
        return;
      }

      if (!Number.isFinite(cantidadValue) || cantidadValue <= 0) {
        setError("La cantidad debe ser un número mayor a 0.");
        cantidad.focus();
        return;
      }

      setError("");
      onAgregarProducto?.({ nombre: nombreValue, cantidad: cantidadValue });
      form.reset();
      cantidad.value = "1";
      nombre.focus();
    });

    // Autofocus inicial
    nombre.focus();

    return { setError, focus: () => nombre.focus() };
  } catch (error) {
    console.error("Error al renderizar el formulario:", error);
    return null;
  }
}
