document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("venderForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("productoNombre").value;
    const precio = parseFloat(document.getElementById("productoPrecio").value);
    const imagen = document.getElementById("productoImagen").value;

    const producto = { nombre, precio, imagen };

    try {
      const response = await fetch("https://backtienda-femq.onrender.com/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(`Error: ${error.error}`);
        return;
      }

      alert("Producto cargado con éxito");
      form.reset();
    } catch (error) {
      alert("Error al enviar el producto. Verificá que el backend esté funcionando.");
      console.error(error);
    }
  });
});
