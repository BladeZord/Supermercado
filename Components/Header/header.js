import { crearElementoHtml } from "../../Scripts/Dom/dom.js"


const headerItems = [
    { tag: "h1", text: "🛒 Lista de Supermercado", className: "title" },
    { tag: "h2", text: "Crear producto", className: "subtitle" }
];

export function renderHeader(container) {
    container.innerHTML = "";
    headerItems.forEach(({ tag, text, className }) => {
        const el = crearElementoHtml(tag, text, className);
        container.append(el);
    });
}

