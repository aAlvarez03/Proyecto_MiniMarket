export async function cargarHeader() {
    try {
        const headerContainer = document.getElementById("headerContainer");
        const response = await fetch("header.html");
        if (!response.ok) throw new Error("Error al cargar el header");
        const headerHTML = await response.text();
        headerContainer.innerHTML = headerHTML;
    } catch (error) {
        console.log("Error al cargar el header o actualizar el carrito:", error);
    }
}