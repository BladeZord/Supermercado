import { obtenerElementosHtmlPorId } from "../../Scripts/Dom/dom.js";

/*
  Componente de pie de página
  Renderiza el año actual y el nombre del autor
*/
export async function renderizadorFooter(container) {
    try {
        // Llamada al html desde el index
        const response = await fetch("./Components/Footer/footer.html");
        const html = await response.text();

        container.innerHTML = html;
        // instancia de los elementos
        const anio = obtenerElementosHtmlPorId("anio_actual");
        const autor = obtenerElementosHtmlPorId("autor");
        // Validacion e inicializacion de los elementos
        if (anio) anio.textContent = new Date().getFullYear();
        if (autor) autor.textContent = "Kevin Quito";
    } catch (error) {
        console.error("Error al renderizar el footer:", error);
    }
}
