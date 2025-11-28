const URL_API = 'https://backtienda-femq.onrender.com/productos'; // tu backend real

const contadorCarrito = document.getElementById('contador-carrito');
const totalElemento = document.getElementById('total');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

let cantidadProductos = 0;
let total = 0;

async function cargarProductos() {
  try {
    const res = await fetch(URL_API);
    if (!res.ok) throw new Error('Error al obtener productos');
    const productos = await res.json();
    mostrarProductos(productos);
  } catch (error) {
    console.error(error);
    document.querySelector('.productos').innerHTML = '<p>Error cargando productos</p>';
  }
}

function mostrarProductos(productos) {
  const contenedor = document.querySelector('.productos');
  contenedor.innerHTML = '';

  productos.forEach(producto => {
    const div = document.createElement('div');
    div.classList.add('producto');
    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio}</p>
      <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
      <button class="agregar" data-precio="${producto.precio}">Agregar al carrito</button>
    `;
    contenedor.appendChild(div);
  });

  inicializarCarrito();
}

function inicializarCarrito() {
  const botonesAgregar = document.querySelectorAll('.agregar');
  botonesAgregar.forEach(boton => {
    boton.addEventListener('click', () => {
      const precio = parseFloat(boton.dataset.precio);
      cantidadProductos++;
      total += precio;
      actualizarCarrito();
    });
  });
}

function actualizarCarrito() {
  if (contadorCarrito) contadorCarrito.textContent = cantidadProductos;
  if (totalElemento) totalElemento.textContent = total.toFixed(2);
}

if (vaciarCarritoBtn) {
  vaciarCarritoBtn.addEventListener('click', () => {
    cantidadProductos = 0;
    total = 0;
    actualizarCarrito();
  });
}

async function eliminarProducto(id) {
  try {
    const res = await fetch(`${URL_API}/${id}`, { method: 'DELETE' });
    if (res.ok) {
      alert('Producto eliminado');
      cargarProductos();
    } else {
      alert('Error al eliminar producto');
    }
  } catch (error) {
    console.error(error);
    alert('Error de conexión');
  }
}

// Iniciar todo al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  cargarProductos();
  actualizarCarrito();
});
