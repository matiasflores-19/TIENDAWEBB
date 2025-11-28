window.productosCargados = [];

document.addEventListener('DOMContentLoaded', () => {
  // Esperamos a que el header se haya insertado:
  const waitForHeader = setInterval(() => {
    const contadorCarrito = document.getElementById('contador-carrito');
    const totalElemento = document.getElementById('total');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    const contenedor = document.querySelector('.productos');

    if (contadorCarrito && totalElemento && vaciarCarritoBtn && contenedor) {
      clearInterval(waitForHeader);

      let cantidadProductos = 0;
      let total = 0;

      window.mostrarProductos = function(productos) {
        contenedor.innerHTML = '';
        productos.forEach(p => {
          const div = document.createElement('div');
          div.classList.add('producto');
          div.innerHTML = `
            <img src="${p.imagen}" alt="${p.nombre}" />
            <h3>${p.nombre}</h3>
            <p>Precio: $${p.precio.toFixed(2)}</p>
            <button class="agregar" data-precio="${p.precio}">Agregar al carrito</button>
          `;
          contenedor.appendChild(div);
        });

        const botonesAgregar = document.querySelectorAll('.agregar');
        botonesAgregar.forEach(boton => {
          boton.addEventListener('click', () => {
            const precio = parseFloat(boton.dataset.precio);
            cantidadProductos++;
            total += precio;
            actualizarCarrito();
          });
        });
      };

      async function cargarProductos() {
        contenedor.innerHTML = 'Cargando productos...';
        try {
          const res = await fetch('https://backtienda-femq.onrender.com/productos');
          const productos = await res.json();

          window.productosCargados = productos; // global

          window.mostrarProductos(productos);
        } catch {
          contenedor.innerHTML = 'Error cargando productos';
        }
      }

      function actualizarCarrito() {
        contadorCarrito.textContent = cantidadProductos;
        totalElemento.textContent = total.toFixed(2);
      }

      vaciarCarritoBtn.addEventListener('click', () => {
        cantidadProductos = 0;
        total = 0;
        actualizarCarrito();
      });

      cargarProductos();
      actualizarCarrito();
    }
  }, 100);
});
