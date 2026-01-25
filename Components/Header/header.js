/*
  Componente Header
  Carga su plantilla HTML para mantener el index.html limpio
*/
export async function renderHeader(container) {
  try {
    if (!container) return;
    const response = await fetch("./Components/Header/header.html");
    const html = await response.text();
    container.innerHTML = html;
  } catch (error) {
    console.error("Error al renderizar el header:", error);
  }
}

