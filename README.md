# Lista de Supermercado

Aplicación web para gestionar una lista de compras. Permite **agregar**, **editar**, marcar como comprados y **eliminar** productos. La información se guarda en el navegador (localStorage) y se mantiene al recargar la página.

El proyecto usa **HTML**, **CSS** y **JavaScript** (Vanilla JS), con separación entre vistas, lógica de negocio, validaciones y persistencia.

---

## Funcionalidades implementadas

- **Agregar productos**  
  Formulario con nombre, cantidad y precio. Validaciones:
  - No se permiten campos vacíos.
  - La cantidad debe ser mayor que cero.

- **Editar productos**  
  Actualizar nombre, cantidad y precio de un producto desde el mismo formulario (sin modales).

- **Lista dinámica**  
  Los productos se renderizan en el DOM con `createElement` y se actualizan sin recargar la página.

- **Marcar como comprado**  
  Cada producto puede marcarse o desmarcarse. Cambio visual con CSS (tachado, opacidad y color).

- **Eliminar productos**  
  Se eliminan del DOM y de localStorage.

- **Contadores**  
  Total de productos, productos comprados y productos pendientes.

- **Persistencia con localStorage**  
  La lista se guarda con la clave `listaSupermercado` y se recupera al recargar.

---

## Tecnologías utilizadas

- **HTML5** — Estructura semántica (header, main, section, footer).
- **CSS3** — Flexbox, diseño tipo card, pseudoclases `:hover` y `:focus`, estilos para estados (comprado/pendiente).
- **JavaScript (ES6+)** — Módulos ES, DOM, localStorage.

---

## Instrucciones de uso

1. Clonar o descargar el repositorio.
2. Abrir el proyecto en **Visual Studio Code**.
3. Instalar la extensión **Live Server**.
4. Pulsar **Go Live** o clic derecho en `index.html` → **Open with Live Server**.
5. Se abrirá el navegador en una URL similar a `http://127.0.0.1:5500/index.html`.
6. En la aplicación:
   - Escribir nombre, cantidad y precio y pulsar **Agregar**.
   - Usar **Editar** para cargar un producto en el formulario y guardar cambios.
   - Usar **Comprado** para cambiar el estado y **Eliminar** para quitar un producto.

---

## Estructura del proyecto

```
.
├── index.html
├── README.md
├── Styles
│   └── styles.css
├── Scripts
│   ├── app.js
│   ├── Lista
│   │   ├── lista.js
│   │   └── listadoProducto.js
│   ├── Producto
│   │   └── producto.js
│   ├── Storage
│   │   └── storage.js
│   └── Utils
│       └── inputValidator.js
└── Views
    ├── header
    │   ├── header.html
    │   └── header.js
    ├── footer
    │   ├── footer.html
    │   └── footer.js
    ├── formularioProducto
    │   ├── formularioProducto.html
    │   └── formularioProducto.js
    ├── listadoProducto
    │   └── listadoProducto.html
    └── mensajeError
        └── mensajeError.html
```

---

## Organización del proyecto

- **Scripts** — Lógica de la aplicación: lista, producto, storage y validaciones.
- **Views** — Plantillas HTML (header, footer, listadoProducto, etc.) y JS de vista cuando aplica.
- **Styles** — Estilos globales en `styles.css`.

---

## Uso responsable de IA (evidencia obligatoria)

### Prompts utilizados

- Uso de localStorage para guardar y recuperar datos.
- Estructuración de arrays y objetos para listas dinámicas.
- Validación de formularios en JavaScript.
- Mejora de legibilidad y organización de estilos CSS.
- Apoyo en la redacción y formato de la documentación.

### Apoyo de la IA

- Uso de `JSON.stringify` y `JSON.parse` con localStorage.
- Revisión de la lógica de contadores.
- Sugerencias de mejora visual y estructural.
- Apoyo en la documentación del proyecto.

### Modificaciones manuales

- Integración entre vistas y lógica JavaScript.
- Personalización de estilos CSS.
- Validaciones, mensajes de error y comentarios en el código.
- Organización final de carpetas y módulos.

### Comentarios en el código

- `Scripts/Lista/lista.js`
- `Scripts/Lista/listadoProducto.js`
- `Views/formularioProducto/formularioProducto.js` (cuando aplica)

---

*Proyecto desarrollado por Kevin Quito, con apoyo de herramientas de asistencia basadas en IA (ChatGPT y Cursor).*
