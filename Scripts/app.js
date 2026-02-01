async function cargarHtmlEn(selector, rutaHtml, { requerido = true } = {}) {
    const el = document.querySelector(selector);
    if (!el) return false;

    const res = await fetch(rutaHtml);
    if (!res.ok) {
        if (requerido) {
            throw new Error(`No se pudo cargar ${rutaHtml} (${res.status})`);
        }
        return false;
    }

    el.innerHTML = await res.text();
    return true;
}

async function iniciarApp() {
    // Header / Footer (opcionales)
    await cargarHtmlEn("#header", "./Views/header/header.html", { requerido: false });
    const footerOk = await cargarHtmlEn("#footer", "./Views/footer/footer.html", { requerido: false });
    if (footerOk) {
        const yearEl = document.getElementById("year");
        if (yearEl) yearEl.textContent = String(new Date().getFullYear());
    }

    // Vista principal por defecto: listado de productos
    await cargarHtmlEn("#app", "./Views/listadoProducto/listadoProducto.html");

    // Si hay lógica JS para el listado, cárgala después de inyectar el HTML
    await import("../Views/listadoProducto/listadoProducto.js");
}

iniciarApp().catch((err) => {
    console.error(err);
    const app = document.getElementById("app");
    if (app) app.innerHTML = "<p>Error cargando la aplicación.</p>";
});