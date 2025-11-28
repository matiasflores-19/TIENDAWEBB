fetch('header.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('header-container').innerHTML = data;

    if (window.location.pathname.includes('home.html')) {
      const searchInput = document.createElement('input');
      searchInput.type = 'text';
      searchInput.id = 'searchInput';
      searchInput.placeholder = 'Buscar productos...';
      searchInput.className = 'searchinput';

      const banner = document.querySelector('.banner');
      const nav = document.querySelector('.navigation');
      if (banner && nav) banner.insertBefore(searchInput, nav);

      searchInput.addEventListener('input', (e) => {
        const texto = e.target.value.toLowerCase();
        const filtrados = window.productosCargados.filter(p =>
          p.nombre.toLowerCase().includes(texto)
        );
        window.mostrarProductos(filtrados);
      });
    }
  });
