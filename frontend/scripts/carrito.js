const botonesAgregar = document.querySelectorAll('.agregar');
const contadorCarrito = document.getElementById('contador-carrito');
const totalElemento = document.getElementById('total');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

let cantidadProductos = 0;
let total = 0;

botonesAgregar.forEach(boton => {
  boton.addEventListener('click', () => {
    const precio = parseFloat(boton.dataset.precio);

    cantidadProductos += 1;
    total += precio;

    // Actualizar carrito después de agregar
    actualizarCarrito();
  });
});

// Función para actualizar el carrito
function actualizarCarrito() {
  contadorCarrito.textContent = cantidadProductos;
  totalElemento.textContent = total.toFixed(2);
}

// Evento para vaciar el carrito
vaciarCarritoBtn.addEventListener('click', () => {
  cantidadProductos = 0;
  total = 0;

  actualizarCarrito();
});