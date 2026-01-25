import { renderizadorFooter } from "../Components/Footer/footer.js";
import { renderHeader } from "../Components/Header/header.js";


document.addEventListener("DOMContentLoaded", async () => {
  const footer = document.getElementById("footer");
  await renderizadorFooter(footer);
  await renderHeader(document.getElementById("header"));
});

