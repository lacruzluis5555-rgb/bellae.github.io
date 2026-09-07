// Barra de Estado
const barraEstado = document.getElementById('barra-estado');

if (barraEstado !== null) {
  // Leemos lo que hay guardado en localStorage
  let comprasGuardadas = JSON.parse(localStorage.getItem("mis_compras")) || [];

  if (comprasGuardadas.length > 0) {
    // Si hay compras, calculamos el total y mostramos la alerta flotante
    let montoTotal = 0;
    comprasGuardadas.forEach(producto => montoTotal += producto.precio);

    barraEstado.style.display = "block";
    barraEstado.style.backgroundColor = "#e8f5e9"; // Verde claro
    barraEstado.style.color = "#2e7d32"; // Texto verde oscuro
    barraEstado.style.border = "1px solid #c8e6c9";
    barraEstado.innerHTML = `<strong>¡Tienes ${comprasGuardadas.length} producto(s) en tu carrito!</strong> Total acumulado: $${montoTotal.toLocaleString('es-CL')} CLP. <a href="servicios.html" style="color: #2e7d32; text-decoration: underline;">Ir a productos</a>`;
  }
}


// CLase 5 carga de dato pag.  nosotros 
const equipoCosmetica = [
    {
        nombre: "Luis La Cruz",
        rol: "Desarrollador y Fundador",
        descripcion: "Encargado de la arquitectura de la plataforma web y la integración del catálogo de jabones artesanales."
    },
    {
        nombre: "María Pérez",
        rol: "Especialista en Formulaciones",
        descripcion: "Responsable del desarrollo de productos como el champú sólido y la crema de aloe vera."
    },
    {
        nombre: "Ana Gómez",
        rol: "Director Comercial",
        descripcion: "A cargo de la experiencia del cliente y la estrategia de marketing digital para nuestra línea natural."
    }
];


const contenedorEquipo = document.getElementById('equipo');

function renderizarEquipo() {
    // Validacion para que se ejecute solo en nosotros.html
    if (contenedorEquipo !== null) {
        let tarjetasHTML = ""; 

        equipoCosmetica.forEach(function(miembro) {
            tarjetasHTML += `
                <div class="tarjeta-perfil" style="border: 1px solid #ccc; padding: 15px; margin: 10px; text-align: center;">
                    <h3>${miembro.nombre}</h3>
                    <h4 style="color: #4CAF50;">${miembro.rol}</h4>
                    <p>${miembro.descripcion}</p>
                </div>
            `;
        });

        // entra la info
        contenedorEquipo.innerHTML = tarjetasHTML;
    }
}
renderizarEquipo();

// CLASE 6 catalogo

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
    }
];

let totalAcumulado = 0;
let totalProductos = 0;

const contenedorCatalogo = document.getElementById('catalogo');
const txtTotal = document.getElementById('monto-total');
const txtCantidad = document.getElementById('cantidad-items');

if (contenedorCatalogo !== null) {
    contenedorCatalogo.innerHTML = "";
    
    productosCosmetica.forEach(producto => {
        const tarjeta = document.createElement('div');
        tarjeta.className = "tarjeta-producto";

        // Determinamos si ya está agotado el stock 0
        const estaAgotado = producto.stock === 0;

        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p><strong>Precio:</strong> $${producto.precio.toLocaleString('es-CL')} CLP</p>
            <p>Stock disponible: <strong id="stock-${producto.id}">${producto.stock}</strong></p>
            <button id="btn-comprar-${producto.id}" class="btn-comprar" ${estaAgotado ? 'disabled' : ''} style="${estaAgotado ? 'background-color: #9e9e9e; cursor: not-allowed;' : ''}">
                ${estaAgotado ? 'Agotado' : 'Añadir al Carrito'}
            </button>
        `;

        contenedorCatalogo.appendChild(tarjeta);

        // Eventos de compra
        const botonCTA = tarjeta.querySelector(`#btn-comprar-${producto.id}`);
        botonCTA.addEventListener('click', () => {
            if (producto.stock > 0) {
                producto.stock--;
                totalAcumulado += producto.precio;
                totalProductos++;

                // 2. Guardamos las compras en localStorage
                let compras = JSON.parse(localStorage.getItem("mis_compras")) || [];
                compras.push({ nombre: producto.nombre, precio: producto.precio });
                localStorage.setItem("mis_compras", JSON.stringify(compras));

                // 3. ¡IMPORTANTE! Guardamos el stock actualizado en localStorage para que no se pierda al recargar
                localStorage.setItem("stock_productos", JSON.stringify(productosCosmetica));

                // Actualizaciones en pantalla
                document.getElementById(`stock-${producto.id}`).innerText = producto.stock;
                if (txtTotal) txtTotal.innerText = totalAcumulado.toLocaleString('es-CL');
                if (txtCantidad) txtCantidad.innerText = totalProductos;

                // Control de stock a 0
                if (producto.stock === 0) {
                    botonCTA.innerText = "Agotado";
                    botonCTA.style.backgroundColor = "#9e9e9e";
                    botonCTA.style.cursor = "not-allowed";
                    botonCTA.disabled = true;
                }
            }
        });
    });
}
// clase 7 localstorage - Login Admin
let formLogin = document.getElementById("loginForm");

if (formLogin !== null) {
    formLogin.addEventListener("submit", function(e) {
        e.preventDefault(); 
        
        let user = document.getElementById("usuario").value.trim();
        let pass = document.getElementById("clave").value.trim();
        let msg = document.getElementById("mensajeLogin");

        // Validacion de clave 
        if (user === "admin" && pass === "1234") {
            msg.innerText = "";
            
            // Ocultamos login
            document.getElementById("seccionLogin").style.display = "none";
            let seccionContacto = document.getElementById("seccion-contacto");
            if (seccionContacto) seccionContacto.style.display = "none";

            // Mostrar panel de admin
            let panel = document.getElementById("panelAdmin");
            panel.style.display = "block";

            // ventas en tabla
            cargarTablaVentas();
        } else {
            msg.innerText = "Usuario o contraseña incorrectos.";
            msg.style.color = "red";
        }
    });
}

function cargarTablaVentas() {
    let tabla = document.getElementById("tablaVentas");
    let ventas = JSON.parse(localStorage.getItem("mis_compras")) || [];
    
    tabla.innerHTML = ""; 

    if (ventas.length === 0) {
        tabla.innerHTML = "<tr><td colspan='2'>No hay ventas registradas en LocalStorage</td></tr>";
    } else {
        for (let i = 0; i < ventas.length; i++) {
            tabla.innerHTML += "<tr>" +
                "<td>" + ventas[i].nombre + "</td>" +
                "<td>$" + ventas[i].precio + " CLP</td>" +
            "</tr>";
        }
    }
}

//CLase 8 contacto
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

    // Limpiamos los mensajes
    errorNombre.innerText = "";
    errorCorreo.innerText = "";
    errorTelefono.innerText = "";
    errorMensaje.innerText = "";
    txtMsg.innerText = "";

    //  Variable para saber si encontramos algún error
    let hayError = false; 
    
    // Validar Nombre
    if (nombre === "") {
      errorNombre.innerText = "Este campo no puede quedar vacío";
      errorNombre.style.color = "red";
      hayError = true;
    }

    // Validar Correo
    if (correo === "") {
      errorCorreo.innerText = "Este campo no puede quedar vacío";
      errorCorreo.style.color = "red";
      hayError = true;
    }

    // Validar Teléfono 
    if (telefono === "") {
      errorTelefono.innerText = "Este campo no puede quedar vacío";
      errorTelefono.style.color = "red";
      hayError = true;
    } else if (isNaN(telefono)) {
      errorTelefono.innerText = "Solo se permiten números";
      errorTelefono.style.color = "red";
      hayError = true;
    } else if (telefono.length < 8) {
      errorTelefono.innerText = "Debe tener al menos 8 números";
      errorTelefono.style.color = "red";
      hayError = true;
    }

    // Validar Mensaje
    if (mensaje === "") {
      errorMensaje.innerText = "Este campo no puede quedar vacío";
      errorMensaje.style.color = "red";
      hayError = true;
    }

    // Si pasamos todas las pruebas 
    if (hayError === false) {
      txtMsg.innerText = "Mensaje enviado con éxito. ";
      txtMsg.style.color = "green";
      formContacto.reset();
    }
  });
}

// clase  finaziamento
let formFinanzas = document.getElementById("formFinanzas");

if (formFinanzas !== null) {
    formFinanzas.addEventListener("submit", function(e) {
        e.preventDefault();

        //variables
        let dominio = parseFloat(document.getElementById("costoDominio").value.trim());
        let hosting = parseFloat(document.getElementById("costoHosting").value.trim());
        let tarifa = parseFloat(document.getElementById("tarifaHora").value.trim());
        let horas = parseFloat(document.getElementById("horasTrabajo").value.trim());
        let cpc = parseFloat(document.getElementById("cpcInput").value.trim());
        let clics = parseFloat(document.getElementById("clicsInput").value.trim());

        let divResultado = document.getElementById("resultadoFinanzas");
        let divAlerta = document.getElementById("alertaAds");

        // Validacion de tipos numericos
        if (isNaN(dominio) || isNaN(hosting) || isNaN(tarifa) || isNaN(horas) || isNaN(cpc) || isNaN(clics)) {
            divResultado.innerText = "Error: Por favor ingresa valores numéricos válidos en todos los campos.";
            divResultado.style.color = "red";
            divAlerta.innerHTML = "";
            return;
        }

        // Operaciones matematicas 
        let manoObra = tarifa * horas;
        let costoAdsMensual = cpc * clics;
        let totalProyecto = dominio + hosting + manoObra + costoAdsMensual;

        divResultado.style.color = "#333";
        divResultado.innerHTML = 
            "<p><strong>Costo Mano de Obra:</strong> $" + manoObra.toLocaleString('es-CL') + " CLP</p>" +
            "<p><strong>Presupuesto Ads Mensual:</strong> $" + costoAdsMensual.toLocaleString('es-CL') + " CLP</p>" +
            "<h3>Costo Total del Proyecto: $" + totalProyecto.toLocaleString('es-CL') + " CLP</h3>";

        //Si Ads supera $50.000 muestra advertencia
        if (costoAdsMensual > 50000) {
            divAlerta.innerHTML = 
                "<div style='background-color: #fff3cd; color: #856404; padding: 15px; border: 1px solid #ffeeba; margin-top: 15px; border-radius: 5px;'>" +
                    "<p>⚠️ Presupuesto de marketing alto para fase de lanzamiento</p>" +
                    "<a href='finanzas.html' class='btn-cta'>Contratar campaña de Ads</a>" +
                "</div>";
        } else {
            divAlerta.innerHTML = "";
        }
    });
}

//Productos 
let contenedorCarritoFinanzas = document.getElementById("lista-carrito-finanzas");

if (contenedorCarritoFinanzas !== null) {
    let compras = JSON.parse(localStorage.getItem("mis_compras")) || [];

    if (compras.length === 0) {
        contenedorCarritoFinanzas.innerHTML = "<p>No has agregado productos al carrito todavía.</p>";
    } else {
        let tablaHTML = "<ul>";
        let subtotal = 0;

        for (let i = 0; i < compras.length; i++) {
            tablaHTML += "<li>" + compras[i].nombre + " - $" + compras[i].precio + " CLP</li>";
            subtotal = subtotal + compras[i].precio;
        }

        tablaHTML += "</ul><p><strong>Subtotal de Productos: $" + subtotal + " CLP</strong></p>";
        contenedorCarritoFinanzas.innerHTML = tablaHTML;
    }
}