# Lista de Supermercado

Aplicación web para gestionar una lista de compras del supermercado. Permite agregar productos con cantidad, marcar como comprados y eliminar. Los datos se guardan en el navegador (localStorage) y se mantienen al recargar la página.

## Funcionalidades implementadas

- **Agregar productos**: formulario con nombre del producto y cantidad. Validación: no campos vacíos y cantidad mayor que cero.
- **Lista dinámica**: los productos se muestran en una lista y se pueden actualizar sin recargar la página (createElement, inserción en el DOM).
- **Marcar como comprado**: cada producto tiene un botón para marcar/desmarcar como comprado. Cambio visual con classList (tachado, opacidad, color).
- **Eliminar productos**: botón eliminar por producto; se quita del DOM y de localStorage.
- **Contadores**: total de productos, productos comprados y productos pendientes.
- **localStorage**: la lista se guarda y se recupera al recargar la página.

## Tecnologías usadas

- HTML5 (estructura semántica: header, main, section, footer)
- CSS3 (Flexbox, diseño tipo card, estilos :hover y :focus)
- JavaScript (ES modules, DOM, localStorage)

## Instrucciones de uso

1. Clonar o descargar el repositorio.
2. Abrir `index.html` en un navegador (o servir la carpeta con un servidor local si se usan módulos desde archivo).
3. En el formulario, escribir el nombre del producto y la cantidad y pulsar "Agregar".
4. Usar "Comprado" para marcar un producto como comprado y "Eliminar" para quitarlo de la lista.

## Uso responsable de IA (evidencia obligatoria)

- **Prompt(s) usados:** Consultas sobre uso de localStorage (guardar/recuperar datos), estructura de datos para la lista y validación de formularios.
- **Qué parte ayudó la IA:** Cómo guardar y leer arrays en localStorage con `JSON.stringify`/`JSON.parse`, y revisión de la lógica de contadores (total, comprados, pendientes).
- **Qué modifiqué manualmente:** Integración con las vistas (header, footer, listado), estilos CSS (card, flexbox, estados comprado/pendiente), mensajes de error y comentarios en el código.
- **Comentarios en el código:** Sí, en `Scripts/Lista/lista.js` y en `Views/listadoProducto/listadoProducto.js`.
- **Explicación:** Utilicé IA para entender cómo guardar datos en localStorage, pero adapté el código y lo integré a mi lógica (clave `listaSupermercado`, funciones reutilizables, validación propia).
