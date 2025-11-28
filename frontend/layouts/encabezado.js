    import React from "react";
    
    export default function Encabezado() {
        return (
            <header>
                <div className="banner">
                    <div className="carrito" id="carrito">
                        <img src="imagenes/carro-de-la-compra.png" alt="shopping cart icon representing the online store cart, simple and neutral design, located in the website header near the cart summary" />
                        <span id="contador-carrito">0</span> productos
                        <p><strong>Total: $<span id="total">0</span></strong></p>
                        <button id="vaciar-carrito" className="carrito-vaciar">Vaciar Carrito</button>
                    </div>
    
                    <img src="imagenes/tienda-online.png" alt="Logo de la Tienda" />
                    <input className="busqueda" type="text" placeholder="Buscar productos..." id="searchInput" />
                    <div className="navigation">
                        <button>Categoría</button>
                        <a href="vender.html"><button>Vender</button></a>
                        <a href="ayuda.html"><button>Ayuda</button></a>
                    </div>
                </div>
            </header>
        );
    }