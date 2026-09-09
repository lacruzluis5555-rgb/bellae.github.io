// --- 1. BARRA DE ESTADO DE COMPRAS ---
const barraEstado = document.getElementById('barra-estado');

if (barraEstado !== null) {
    let comprasGuardadas = JSON.parse(localStorage.getItem("mis_compras")) || [];

    if (comprasGuardadas.length > 0) {
        let montoTotal = comprasGuardadas.reduce((acc, prod) => acc + prod.precio, 0);

        barraEstado.style.display = "block"; 
        barraEstado.style.backgroundColor = "#bfd49b";
        barraEstado.style.color = "#000000";
        barraEstado.style.padding = "10px";
        barraEstado.style.textAlign = "center";

        barraEstado.innerHTML = `<strong>¡Tienes ${comprasGuardadas.length} producto(s) en tu carrito!</strong> Total acumulado: $${montoTotal.toLocaleString('es-CL')} CLP. <a href="finanzas.html" style="color: #000000; text-decoration: underline; margin-left: 10px;">Ir al carrito</a>`;
    } else {
        barraEstado.style.display = "none";
    }
}

// --- 2. EQUIPO (NOSOTROS.HTML) ---
const equipoCosmetica = [
    {
        nombre: "Luis La Cruz",
        rol: "Desarrollador y Fundador",
        descripcion: "Encargado de la arquitectura de la plataforma web y la integración del catálogo de jabones artesanales.",
        imagen: "img/yo.jpg"
    },
    {
        nombre: "María Pérez",
        rol: "Especialista en Formulaciones",
        descripcion: "Responsable del desarrollo de productos como el champú sólido y la crema de aloe vera.",
        imagen: "https://bw.cemp.es/wp-content/uploads/2025/12/FORMULACION-COSMETICA-1.jpg"
    },
    {
        nombre: "Ana Gómez",
        rol: "Directora Comercial",
        descripcion: "A cargo de la experiencia del cliente y la estrategia de marketing digital para nuestra línea natural.",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR48hbCUtNt1HLK54q56kul-nO1EP0H9DDd-hwXoh8ldyvSUZ8A4NLMS-nE&s=10"
    },
    {
        nombre: "Juan Villareal",
        rol: "Encargado Marketing",
        descripcion: "A cargo de la publicidad de los productos y la web",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrvvr2kl0cwYMtBB40jrI_RdqMB-QxIApjb7raryFLnwIZooaifrjEzWwB&s=10"
    },
    {
        nombre: "Jose Alerte",
        rol: "Director de Ventas y Expansión",
        descripcion: "A cargo de la estrategia comercial, alianzas de distribución y la experiencia del cliente para la línea de productos naturales.",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjMKp3CA_GKuYsHGq2HcK22c5mXIsTw405ulp-ZT4IEihBfT8ITDJksbMy&s=10"
    }
];

const contenedorEquipo = document.getElementById('equipo');

function renderizarEquipo() {
    if (contenedorEquipo !== null) {
        let tarjetasHTML = ""; 

        equipoCosmetica.forEach(miembro => {
            tarjetasHTML += `
                <div class="tarjeta-perfil">
                    <img src="${miembro.imagen}" alt="${miembro.nombre}">
                    <h3>${miembro.nombre}</h3>
                    <h4>${miembro.rol}</h4>
                    <p>${miembro.descripcion}</p>
                </div>
            `;
        });

        contenedorEquipo.innerHTML = tarjetasHTML;
    }
}
renderizarEquipo();


// --- 3. CATÁLOGO DE PRODUCTOS (SERVICIOS.HTML) ---
let productosCosmetica = JSON.parse(localStorage.getItem("stock_productos")) || [
    {
        id: 1,
        nombre: "Crema de Aloe Vera",
        precio: 8500,
        stock: 10,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkI3_En5UGLAaeHyWrDFQy5ACv2u9GhG-Gjc3YGptOFg&s=10",
        descripcion: "Hidratación profunda para pieles sensibles con extracto 100% natural."
    },
    {
        id: 2,
        nombre: "Jabón Artesanal de Avena",
        precio: 3500,
        stock: 15,
        imagen: "https://mejorconsalud.as.com/wp-content/uploads/2017/10/jabon-artesanal-avena.jpg",
        descripcion: "Exfoliante suave con ingredientes orgánicos y miel pura."
    },
    {
        id: 3,
        nombre: "Champú Sólido de Romero",
        precio: 6000,
        stock: 8,
        imagen: "https://www.ceroresiduo.com/wp-content/uploads/178008003.jpg",
        descripcion: "Fortalece el cabello desde la raíz, sin sulfatos ni parabenos."
    },
    {
        id: 4,
        nombre: "Sérum Capilar Nutritivo",
        precio: 8000,
        stock: 5,
        imagen: "img/serum.jfif",
        descripcion: "Fortalece el cabello desde la raíz, sin sulfatos ni parabenos."
    },
    {
        id: 5,
        nombre: "Mascarilla de Arcilla Rosa",
        precio: 7500,
        stock: 8,
        imagen: "img/mascarilla.webp",
        descripcion: "Desintoxica y devuelve la luminosidad a tu rostro."
    },
    {
        id: 6,
        nombre: "Bálsamo Labial de Karité",
        precio: 3000,
        stock: 12,
        imagen: "img/balsamo2.webp", 
        descripcion: "Protección y suavidad duradera para tus labios."
    }   
];

const contenedorCatalogo = document.getElementById('catalogo');
const txtTotal = document.getElementById('monto-total');
const txtCantidad = document.getElementById('cantidad-items');

function renderizarCatalogo() {
    if (contenedorCatalogo === null) return;

    contenedorCatalogo.innerHTML = "";
    
    let compras = JSON.parse(localStorage.getItem("mis_compras")) || [];
    let totalAcumulado = compras.reduce((acc, p) => acc + p.precio, 0);
    let totalProductos = compras.length;

    if (txtTotal) txtTotal.innerText = totalAcumulado.toLocaleString('es-CL');
    if (txtCantidad) txtCantidad.innerText = totalProductos;

    productosCosmetica.forEach(producto => {
        const tarjeta = document.createElement('div');
        tarjeta.className = "tarjeta-producto";
        const estaAgotado = producto.stock === 0;

        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p><strong>Precio:</strong> $${producto.precio.toLocaleString('es-CL')} CLP</p>
            <p>Stock disponible: <strong>${producto.stock}</strong></p>
            <button class="btn-comprar" ${estaAgotado ? 'disabled' : ''} onclick="agregarAlCarrito(${producto.id})">
                ${estaAgotado ? 'Agotado' : 'Añadir al Carrito'}
            </button>
        `;

        contenedorCatalogo.appendChild(tarjeta);
    });
}

window.agregarAlCarrito = function(idProducto) {
    let producto = productosCosmetica.find(p => p.id === idProducto);

    if (producto && producto.stock > 0) {
        producto.stock--;

        let compras = JSON.parse(localStorage.getItem("mis_compras")) || [];
        compras.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio });

        localStorage.setItem("mis_compras", JSON.stringify(compras));
        localStorage.setItem("stock_productos", JSON.stringify(productosCosmetica));

        renderizarCatalogo();
    }
};

renderizarCatalogo();


// --- 4. RESUMEN DE CARRITO Y COMPRA (FINANZAS.HTML) ---
function renderizarCarritoFinanzas() {
    const contenedor = document.getElementById("lista-carrito-finanzas");
    const txtSubtotal = document.getElementById("subtotal-finanzas");
    const btnComprar = document.getElementById("btn-comprar-finanzas");

    if (contenedor === null) return;

    let compras = JSON.parse(localStorage.getItem("mis_compras")) || [];
    let total = 0;

    if (compras.length === 0) {
        contenedor.innerHTML = "<p>No has agregado productos al carrito todavía.</p>";
        if (txtSubtotal) txtSubtotal.innerText = "0";
        if (btnComprar) btnComprar.style.display = "none";
        return;
    }

    if (btnComprar) btnComprar.style.display = "block";

    let htmlList = "<ul class='lista-carrito'>";
    compras.forEach((item, index) => {
        total += item.precio;
        htmlList += `
            <li>
                <span>${item.nombre} - $${item.precio.toLocaleString('es-CL')} CLP</span>
                <button class="btn-quitar" onclick="quitarDelCarrito(${index})">Quitar</button>
            </li>
        `;
    });
    htmlList += "</ul>";

    contenedor.innerHTML = htmlList;
    if (txtSubtotal) txtSubtotal.innerText = total.toLocaleString('es-CL');
}

window.quitarDelCarrito = function(indexEnCarrito) {
    let compras = JSON.parse(localStorage.getItem("mis_compras")) || [];
    let productoEliminado = compras[indexEnCarrito];

    if (productoEliminado) {
        let prodEnStock = productosCosmetica.find(p => p.id === productoEliminado.id || p.nombre === productoEliminado.nombre);
        if (prodEnStock) {
            prodEnStock.stock++;
        }

        compras.splice(indexEnCarrito, 1);

        localStorage.setItem("mis_compras", JSON.stringify(compras));
        localStorage.setItem("stock_productos", JSON.stringify(productosCosmetica));

        renderizarCarritoFinanzas();
    }
};

const btnComprarFinanzas = document.getElementById("btn-comprar-finanzas");
if (btnComprarFinanzas !== null) {
    btnComprarFinanzas.addEventListener("click", function() {
        let compras = JSON.parse(localStorage.getItem("mis_compras")) || [];
        if (compras.length === 0) return;

        let totalMonto = compras.reduce((acc, prod) => acc + prod.precio, 0);

        let nuevaVenta = {
            idOrden: "ORD-" + Date.now().toString().slice(-5),
            fecha: new Date().toLocaleString('es-CL'),
            productos: compras,
            total: totalMonto
        };

        let historialVentas = JSON.parse(localStorage.getItem("ventas_registradas")) || [];
        historialVentas.push(nuevaVenta);
        localStorage.setItem("ventas_registradas", JSON.stringify(historialVentas));

        localStorage.removeItem("mis_compras");

        const msgExito = document.getElementById("mensaje-compra-exito");
        if (msgExito) {
            msgExito.innerText = "¡Compra realizada con éxito! Orden registrada en el Panel Admin.";
        }

        renderizarCarritoFinanzas();
    });
}

renderizarCarritoFinanzas();


// --- 5. CALCULADORA PRESUPUESTO (FINANZAS.HTML) ---
let formFinanzas = document.getElementById("formFinanzas");

if (formFinanzas !== null) {
    formFinanzas.addEventListener("submit", function(e) {
        e.preventDefault();

        let dominio = parseFloat(document.getElementById("costoDominio").value.trim());
        let hosting = parseFloat(document.getElementById("costoHosting").value.trim());
        let tarifa = parseFloat(document.getElementById("tarifaHora").value.trim());
        let horas = parseFloat(document.getElementById("horasTrabajo").value.trim());
        let cpc = parseFloat(document.getElementById("cpcInput").value.trim());
        let clics = parseFloat(document.getElementById("clicsInput").value.trim());

        let divResultado = document.getElementById("resultadoFinanzas");
        let divAlerta = document.getElementById("alertaAds");

        if (isNaN(dominio) || isNaN(hosting) || isNaN(tarifa) || isNaN(horas) || isNaN(cpc) || isNaN(clics) ||
            dominio < 0 || hosting < 0 || tarifa < 0 || horas < 0 || cpc < 0 || clics < 0) {
            divResultado.innerText = "Error: Por favor ingresa valores numéricos válidos y positivos.";
            divResultado.style.color = "red"; // Pinta el error en rojo
            divAlerta.innerHTML = "";
            return;
        }

        // Restaura el color normal (quitamos el rojo) si la operación es exitosa
        divResultado.style.color = "";

        let manoObra = tarifa * horas;
        let costoAdsMensual = cpc * clics;
        let totalProyecto = dominio + hosting + manoObra + costoAdsMensual;

        divResultado.innerHTML = `
            <p><strong>Costo Mano de Obra:</strong> $${manoObra.toLocaleString('es-CL')} CLP</p>
            <p><strong>Presupuesto Ads Mensual:</strong> $${costoAdsMensual.toLocaleString('es-CL')} CLP</p>
            <h3>Costo Total del Proyecto: $${totalProyecto.toLocaleString('es-CL')} CLP</h3>
        `;

        if (costoAdsMensual > 50000) {
            divAlerta.innerHTML = `
                <div class="alerta-ads">
                    <p>⚠️ Presupuesto de marketing alto para fase de lanzamiento</p>
                    <a href="finanzas.html" class="btn-cta">Contratar campaña de Ads</a>
                </div>
            `;
        } else {
            divAlerta.innerHTML = "";
        }
    });
}

// --- 6. FORMULARIO DE CONTACTO (CONTACTO.HTML) ---
let formContacto = document.getElementById("formContacto");

if (formContacto !== null) {
    formContacto.addEventListener("submit", function(e) {
        e.preventDefault(); 

        let nombre = document.getElementById("nombreContacto").value.trim();
        let correo = document.getElementById("correoContacto").value.trim();
        let telefono = document.getElementById("telefonoContacto").value.trim();
        let mensaje = document.getElementById("mensajeTexto").value.trim();

        let errorNombre = document.getElementById("errorNombre");
        let errorCorreo = document.getElementById("errorCorreo");
        let errorTelefono = document.getElementById("errorTelefono");
        let errorMensaje = document.getElementById("errorMensaje");
        let txtMsg = document.getElementById("msgContacto");

        // Limpiamos los mensajes antes de validar
        errorNombre.innerText = "";
        errorCorreo.innerText = "";
        errorTelefono.innerText = "";
        errorMensaje.innerText = "";
        txtMsg.innerText = "";

        let hayError = false; 

        if (nombre === "") {
            errorNombre.innerText = "Este campo no puede quedar vacío";
            errorNombre.style.color = "red"; // Pinta el texto de rojo
            hayError = true;
        }

        if (correo === "") {
            errorCorreo.innerText = "Este campo no puede quedar vacío";
            errorCorreo.style.color = "red"; // Pinta el texto de rojo
            hayError = true;
        }

        if (telefono === "") {
            errorTelefono.innerText = "Este campo no puede quedar vacío";
            errorTelefono.style.color = "red"; // Pinta el texto de rojo
            hayError = true;
        } else if (isNaN(telefono)) {
            errorTelefono.innerText = "Solo se permiten números";
            errorTelefono.style.color = "red"; // Pinta el texto de rojo
            hayError = true;
        } else if (telefono.length < 8) {
            errorTelefono.innerText = "Debe tener al menos 8 números";
            errorTelefono.style.color = "red"; // Pinta el texto de rojo
            hayError = true;
        }

        if (mensaje === "") {
            errorMensaje.innerText = "Este campo no puede quedar vacío";
            errorMensaje.style.color = "red"; // Pinta el texto de rojo
            hayError = true;
        }

        if (!hayError) {
            txtMsg.innerText = "Mensaje enviado con éxito.";
            txtMsg.style.color = "green"; // Pinta el éxito en verde
            formContacto.reset();
        }
    });
}

// --- 7. LOGIN Y PANEL DE ADMIN (CONTACTO.HTML) ---
let formLogin = document.getElementById("loginForm");

if (formLogin !== null) {
    formLogin.addEventListener("submit", function(e) {
        e.preventDefault(); 
        
        let user = document.getElementById("usuario").value.trim();
        let pass = document.getElementById("clave").value.trim();
        let msg = document.getElementById("mensajeLogin");

        if (user === "admin" && pass === "1234") {
            msg.innerText = "";
            msg.style.color = ""; // Limpiamos el color
            document.getElementById("seccionLogin").style.display = "none";
            let seccionContacto = document.getElementById("seccion-contacto");
            if (seccionContacto) seccionContacto.style.display = "none";

            let panel = document.getElementById("panelAdmin");
            if (panel) panel.style.display = "block";

            cargarTablaVentas();
        } else {
            msg.innerText = "Usuario o contraseña incorrectos.";
            msg.style.color = "red"; // Pinta el error de login en rojo
        }
    });
}

function cargarTablaVentas() {
    let tabla = document.getElementById("tablaVentas");
    if (!tabla) return;

    let ventas = JSON.parse(localStorage.getItem("ventas_registradas")) || [];
    tabla.innerHTML = ""; 

    if (ventas.length === 0) {
        tabla.innerHTML = "<tr><td colspan='3'>No hay ventas registradas</td></tr>";
    } else {
        ventas.forEach(venta => {
            let listaNombres = venta.productos ? venta.productos.map(p => p.nombre).join(", ") : venta.nombre;
            let totalPago = venta.total ? venta.total.toLocaleString('es-CL') : venta.precio;

            tabla.innerHTML += `
                <tr>
                    <td><strong>${venta.idOrden || 'ORD-000'}</strong><br><small>${venta.fecha || ''}</small></td>
                    <td>${listaNombres}</td>
                    <td><strong>$${totalPago} CLP</strong></td>
                </tr>
            `;
        });
    }
}