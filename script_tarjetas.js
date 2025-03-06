/**
 * Script para las tarjetas de carreras y sistema de filtrado
 * Destino Aventura
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar las tarjetas de carreras
    inicializarTarjetas();
    
    // Inicializar el sistema de filtrado
    inicializarFiltros();
});

/**
 * Inicializa las tarjetas de carreras
 */
function inicializarTarjetas() {
    // Obtener todas las tarjetas de carreras
    const tarjetas = document.querySelectorAll('.carrera-item');
    
    if (!tarjetas.length) return;
    
    // Procesar cada tarjeta
    tarjetas.forEach((tarjeta, index) => {
        // Añadir clase de animación con retraso basado en el índice
        setTimeout(() => {
            tarjeta.classList.add('animate__animated', 'animate__fadeInUp');
            tarjeta.style.opacity = 1;
        }, index * 100);
        
        // Extraer información de las etiquetas para mostrar visualmente
        procesarEtiquetas(tarjeta);
        
        // Configurar funcionalidad de expandir/colapsar
        configurarExpansion(tarjeta);
    });
}

/**
 * Procesa las etiquetas de una tarjeta para mostrarlas visualmente
 * @param {HTMLElement} tarjeta - Elemento de la tarjeta de carrera
 */
function procesarEtiquetas(tarjeta) {
    // Obtener todas las etiquetas de filtrado
    const etiquetasFiltro = tarjeta.querySelectorAll('.etiqueta-filtro');
    const contenedorEtiquetas = tarjeta.querySelector('.carrera-etiquetas');
    const ubicacionTexto = tarjeta.querySelector('.ubicacion-texto');
    
    if (!etiquetasFiltro.length || !contenedorEtiquetas) return;
    
    // Variables para almacenar información extraída
    let tipoCarrera = null;
    let distancia = null;
    let localidad = null;
    
    // Procesar cada etiqueta
    etiquetasFiltro.forEach(etiqueta => {
        const textoEtiqueta = etiqueta.getAttribute('data-etiqueta');
        
        if (!textoEtiqueta) return;
        
        // Extraer tipo de carrera
        if (textoEtiqueta.startsWith('tipo-')) {
            tipoCarrera = textoEtiqueta.replace('tipo-', '');
            const etiquetaTipo = document.createElement('span');
            etiquetaTipo.className = 'etiqueta trail';
            etiquetaTipo.textContent = tipoCarrera.toUpperCase();
            contenedorEtiquetas.appendChild(etiquetaTipo);
        }
        
        // Extraer distancia
        if (textoEtiqueta.startsWith('categoria-')) {
            distancia = textoEtiqueta.replace('categoria-', '');
            const etiquetaDistancia = document.createElement('span');
            etiquetaDistancia.className = 'etiqueta distancia';
            etiquetaDistancia.textContent = distancia.toUpperCase();
            contenedorEtiquetas.appendChild(etiquetaDistancia);
        }
        
        // Extraer localidad
        if (textoEtiqueta.startsWith('localidad-')) {
            localidad = textoEtiqueta.replace('localidad-', '');
            localidad = localidad.replace(/-/g, ' ');
            localidad = localidad.replace(/\b\w/g, l => l.toUpperCase());
            
            if (ubicacionTexto) {
                ubicacionTexto.textContent = localidad;
            }
        }
    });
}

/**
 * Configura la funcionalidad de expandir/colapsar para una tarjeta
 * @param {HTMLElement} tarjeta - Elemento de la tarjeta de carrera
 */
function configurarExpansion(tarjeta) {
    const botonExpandir = tarjeta.querySelector('.boton-expandir');
    const contenido = tarjeta.querySelector('.carrera-contenido');
    
    if (!botonExpandir || !contenido) return;
    
    botonExpandir.addEventListener('click', function() {
        // Alternar clase expandido
        contenido.classList.toggle('expandido');
        
        // Cambiar texto del botón
        if (contenido.classList.contains('expandido')) {
            botonExpandir.textContent = 'Ver menos';
        } else {
            botonExpandir.textContent = 'Ver más';
        }
    });
}

/**
 * Inicializa el sistema de filtrado
 */
function inicializarFiltros() {
    // Obtener elementos del DOM
    const filtroFecha = document.getElementById('filtro-fecha');
    const filtroTipo = document.getElementById('filtro-tipo');
    const filtroDistancia = document.getElementById('filtro-distancia');
    const filtroLocalidad = document.getElementById('filtro-localidad');
    const botonFiltrar = document.getElementById('boton-filtrar');
    const botonLimpiar = document.getElementById('boton-limpiar');
    const estadoFiltro = document.getElementById('estado-filtro');
    const sinResultados = document.getElementById('sin-resultados');
    const limpiarFiltrosLink = document.getElementById('limpiar-filtros-link');
    const botonLimpiarResultados = document.getElementById('boton-limpiar-resultados');
    
    // Verificar que existan los elementos necesarios
    if (!filtroFecha || !filtroTipo || !filtroDistancia || !filtroLocalidad || !botonFiltrar || !botonLimpiar) return;
    
    // Obtener todas las tarjetas y etiquetas
    const tarjetas = document.querySelectorAll('.carrera-item');
    if (!tarjetas.length) return;
    
    // Recopilar valores únicos para cada filtro
    const fechas = new Set();
    const tipos = new Set();
    const distancias = new Set();
    const localidades = new Set();
    
    // Procesar cada tarjeta para extraer valores de filtrado
    tarjetas.forEach(tarjeta => {
        const etiquetasFiltro = tarjeta.querySelectorAll('.etiqueta-filtro');
        
        etiquetasFiltro.forEach(etiqueta => {
            const textoEtiqueta = etiqueta.getAttribute('data-etiqueta');
            
            if (!textoEtiqueta) return;
            
            // Extraer fecha
            if (textoEtiqueta.startsWith('fecha-')) {
                const fecha = textoEtiqueta.replace('fecha-', '');
                const [mes, anio] = fecha.split('-');
                const nombreMes = obtenerNombreMes(parseInt(mes));
                fechas.add(`${nombreMes} ${anio}`);
            }
            
            // Extraer tipo
            if (textoEtiqueta.startsWith('tipo-')) {
                const tipo = textoEtiqueta.replace('tipo-', '');
                tipos.add(formatearTexto(tipo));
            }
            
            // Extraer distancia
            if (textoEtiqueta.startsWith('categoria-')) {
                const distancia = textoEtiqueta.replace('categoria-', '');
                distancias.add(distancia.toUpperCase());
            }
            
            // Extraer localidad
            if (textoEtiqueta.startsWith('localidad-')) {
                const localidad = textoEtiqueta.replace('localidad-', '');
                localidades.add(formatearTexto(localidad));
            }
        });
    });
    
    // Llenar los selectores con las opciones disponibles
    llenarSelector(filtroFecha, Array.from(fechas).sort());
    llenarSelector(filtroTipo, Array.from(tipos).sort());
    llenarSelector(filtroDistancia, Array.from(distancias).sort());
    llenarSelector(filtroLocalidad, Array.from(localidades).sort());
    
    // Evento para el botón de filtrar
    botonFiltrar.addEventListener('click', function() {
        aplicarFiltros(tarjetas, estadoFiltro, sinResultados);
    });
    
    // Eventos para limpiar filtros
    if (botonLimpiar) {
        botonLimpiar.addEventListener('click', function() {
            limpiarFiltros(tarjetas, estadoFiltro, sinResultados);
        });
    }
    
    if (limpiarFiltrosLink) {
        limpiarFiltrosLink.addEventListener('click', function(e) {
            e.preventDefault();
            limpiarFiltros(tarjetas, estadoFiltro, sinResultados);
        });
    }
    
    if (botonLimpiarResultados) {
        botonLimpiarResultados.addEventListener('click', function() {
            limpiarFiltros(tarjetas, estadoFiltro, sinResultados);
        });
    }
}

/**
 * Llena un selector con opciones
 * @param {HTMLSelectElement} selector - Elemento select a llenar
 * @param {Array} opciones - Array de opciones a añadir
 */
function llenarSelector(selector, opciones) {
    if (!selector || !opciones.length) return;
    
    // Mantener la opción por defecto
    const opcionPorDefecto = selector.options[0];
    
    // Limpiar opciones existentes
    selector.innerHTML = '';
    
    // Añadir opción por defecto
    selector.appendChild(opcionPorDefecto);
    
    // Añadir nuevas opciones
    opciones.forEach(opcion => {
        const nuevaOpcion = document.createElement('option');
        nuevaOpcion.value = opcion;
        nuevaOpcion.textContent = opcion;
        selector.appendChild(nuevaOpcion);
    });
}

/**
 * Aplica los filtros seleccionados a las tarjetas
 * @param {NodeList} tarjetas - Lista de tarjetas a filtrar
 * @param {HTMLElement} estadoFiltro - Elemento para mostrar el estado del filtro
 * @param {HTMLElement} sinResultados - Elemento para mostrar cuando no hay resultados
 */
function aplicarFiltros(tarjetas, estadoFiltro, sinResultados) {
    // Obtener valores de los filtros
    const filtroFecha = document.getElementById('filtro-fecha').value;
    const filtroTipo = document.getElementById('filtro-tipo').value;
    const filtroDistancia = document.getElementById('filtro-distancia').value;
    const filtroLocalidad = document.getElementById('filtro-localidad').value;
    
    // Verificar si hay algún filtro activo
    const hayFiltrosActivos = filtroFecha || filtroTipo || filtroDistancia || filtroLocalidad;
    
    // Mostrar/ocultar estado de filtro
    if (estadoFiltro) {
        estadoFiltro.style.display = hayFiltrosActivos ? 'block' : 'none';
    }
    
    let tarjetasVisibles = 0;
    
    // Aplicar filtros a cada tarjeta
    tarjetas.forEach(tarjeta => {
        const etiquetasFiltro = tarjeta.querySelectorAll('.etiqueta-filtro');
        let cumpleFecha = !filtroFecha;
        let cumpleTipo = !filtroTipo;
        let cumpleDistancia = !filtroDistancia;
        let cumpleLocalidad = !filtroLocalidad;
        
        // Verificar cada etiqueta
        etiquetasFiltro.forEach(etiqueta => {
            const textoEtiqueta = etiqueta.getAttribute('data-etiqueta');
            
            if (!textoEtiqueta) return;
            
            // Verificar fecha
            if (filtroFecha && textoEtiqueta.startsWith('fecha-')) {
                const fecha = textoEtiqueta.replace('fecha-', '');
                const [mes, anio] = fecha.split('-');
                const nombreMes = obtenerNombreMes(parseInt(mes));
                const fechaFormateada = `${nombreMes} ${anio}`;
                
                if (fechaFormateada === filtroFecha) {
                    cumpleFecha = true;
                }
            }
            
            // Verificar tipo
            if (filtroTipo && textoEtiqueta.startsWith('tipo-')) {
                const tipo = textoEtiqueta.replace('tipo-', '');
                
                if (formatearTexto(tipo) === filtroTipo) {
                    cumpleTipo = true;
                }
            }
            
            // Verificar distancia
            if (filtroDistancia && textoEtiqueta.startsWith('categoria-')) {
                const distancia = textoEtiqueta.replace('categoria-', '');
                
                if (distancia.toUpperCase() === filtroDistancia) {
                    cumpleDistancia = true;
                }
            }
            
            // Verificar localidad
            if (filtroLocalidad && textoEtiqueta.startsWith('localidad-')) {
                const localidad = textoEtiqueta.replace('localidad-', '');
                
                if (formatearTexto(localidad) === filtroLocalidad) {
                    cumpleLocalidad = true;
                }
            }
        });
        
        // Mostrar/ocultar tarjeta según cumplimiento de filtros
        const cumpleTodos = cumpleFecha && cumpleTipo && cumpleDistancia && cumpleLocalidad;
        
        if (cumpleTodos) {
            tarjeta.style.display = '';
            tarjetasVisibles++;
        } else {
            tarjeta.style.display = 'none';
        }
    });
    
    // Mostrar mensaje de sin resultados si es necesario
    if (sinResultados) {
        sinResultados.style.display = (hayFiltrosActivos && tarjetasVisibles === 0) ? 'block' : 'none';
    }
}

/**
 * Limpia todos los filtros y muestra todas las tarjetas
 * @param {NodeList} tarjetas - Lista de tarjetas
 * @param {HTMLElement} estadoFiltro - Elemento para mostrar el estado del filtro
 * @param {HTMLElement} sinResultados - Elemento para mostrar cuando no hay resultados
 */
function limpiarFiltros(tarjetas, estadoFiltro, sinResultados) {
    // Resetear selectores
    document.getElementById('filtro-fecha').selectedIndex = 0;
    document.getElementById('filtro-tipo').selectedIndex = 0;
    document.getElementById('filtro-distancia').selectedIndex = 0;
    document.getElementById('filtro-localidad').selectedIndex = 0;
    
    // Mostrar todas las tarjetas
    tarjetas.forEach(tarjeta => {
        tarjeta.style.display = '';
    });
    
    // Ocultar mensajes de estado
    if (estadoFiltro) estadoFiltro.style.display = 'none';
    if (sinResultados) sinResultados.style.display = 'none';
}

/**
 * Obtiene el nombre del mes a partir de su número
 * @param {number} numeroMes - Número del mes (1-12)
 * @returns {string} Nombre del mes
 */
function obtenerNombreMes(numeroMes) {
    const meses = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    
    return meses[numeroMes - 1] || '';
}

/**
 * Formatea un texto para mostrar (capitaliza y reemplaza guiones por espacios)
 * @param {string} texto - Texto a formatear
 * @returns {string} Texto formateado
 */
function formatearTexto(texto) {
    if (!texto) return '';
    
    return texto
        .replace(/-/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
}
