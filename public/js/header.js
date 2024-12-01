export async function cargarHeader() {
  try {
    const headerContainer = document.getElementById("headerContainer");
    const response = await fetch("header.html");
    if (!response.ok) throw new Error("Error al cargar el header");
    const headerHTML = await response.text();
    headerContainer.innerHTML = headerHTML;

    // Ejecutamos la logica de activacion de enlaces
    activarEnlace();
  } catch (error) {
    console.log("Error al cargar el header o actualizar el carrito:", error);
  }
}

function activarEnlace() {
  // Variables
  let inicioLink = document.getElementById("inicioLink");
  let categoriaLink = document.getElementById("categoriaLink");
  let carritoLink = document.getElementById("carritoLink");

  if (window.location.pathname.includes("index.html")) {
    if (!inicioLink.classList.contains("active")) {
      inicioLink.classList.add("active");
      categoriaLink.classList.remove("active");
      carritoLink.classList.remove("active");
    }
  } else if (
    window.location.pathname.includes("electronica.html") ||
    window.location.pathname.includes("muebles.html") ||
    window.location.pathname.includes("decoracion.html")
  ) {
    if (!categoriaLink.classList.contains("active")) {
      categoriaLink.classList.add("active");
      inicioLink.classList.remove("active");
      carritoLink.classList.remove("active");
    }
  } else if (window.location.pathname.includes("carrito.html")) {
    if (!carritoLink.classList.contains("active")) {
      carritoLink.classList.add("active");
      inicioLink.classList.remove("active");
      categoriaLink.classList.remove("active");
    }
  }
}
