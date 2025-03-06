/**
 * Sistema de filtrado para el blog Destino Aventura
 * Este script permite filtrar las entradas del blog por fecha, tipo, distancia y ubicación
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el sistema de filtrado
    inicializarFiltros();
});

/**
 * Inicializa el sistema de filtrado
 */
function inicializarFiltros() {
    // Crear el panel de filtros si no existe
    crearPanelFiltros();
    
    // Cargar los valores disponibles para cada filtro
    cargarValoresFiltros();
    
    // Agregar event listeners a los filtros
    agregarEventListeners();
}

/**
 * Crea el panel de filtros en la página
 */
function crearPanelFiltros() {
    // Verificar si ya existe el panel
    if (document.getElementById('filtros-carreras')) {
        return;
    }
    
    // Crear el contenedor principal de filtros
    const panelFiltros = document.createElement('div');
    panelFiltros.id = 'filtros-carreras';
    panelFiltros.className = 'filtros-container';
    
    // Crear el título del panel
    const titulo = document.createElement('h3');
    titulo.textContent = 'Filtrar Carreras';
    panelFiltros.appendChild(titulo);
    
    // Crear los diferentes filtros
    const filtros = [
        {
            id: 'filtro-fecha',
            label: 'Fecha (Mes/Año)',
            tipo: 'select'
        },
        {
            id: 'filtro-tipo',
            label: 'Tipo de Carrera',
            tipo: 'select'
        },
        {
            id: 'filtro-distancia',
            label: 'Distancia',
            tipo: 'select'
        },
        {
            id: 'filtro-ubicacion',
            label: 'Ubicación',
            tipo: 'select'
        }
    ];
    
    // Crear cada filtro
    filtros.forEach(filtro => {
        const grupo = document.createElement('div');
        grupo.className = 'grupo-filtro';
        
        const label = document.createElement('label');
        label.setAttribute('for', filtro.id);
        label.textContent = filtro.label;
        grupo.appendChild(label);
        
        if (filtro.tipo === 'select') {
            const select = document.createElement('select');
            select.id = filtro.id;
            select.className = 'filtro-select';
            
            // Opción por defecto
            const opcionDefault = document.createElement('option');
            opcionDefault.value = '';
            opcionDefault.textContent = 'Todos';
            select.appendChild(opcionDefault);
            
            grupo.appendChild(select);
        }
        
        panelFiltros.appendChild(grupo);
    });
    
    // Botón para limpiar filtros
    const btnLimpiar = document.createElement('button');
    btnLimpiar.id = 'btn-limpiar-filtros';
    btnLimpiar.textContent = 'Limpiar Filtros';
    btnLimpiar.className = 'btn-limpiar';
    panelFiltros.appendChild(btnLimpiar);
    
    // Insertar el panel en la página
    const contenedor = document.querySelector('.blog-posts') || document.querySelector('#main');
    if (contenedor) {
        contenedor.insertBefore(panelFiltros, contenedor.firstChild);
    }
}

/**
 * Carga los valores disponibles para cada filtro basado en las etiquetas del blog
 */
function cargarValoresFiltros() {
    // Obtener todas las etiquetas disponibles
    const etiquetas = obtenerEtiquetasDisponibles();
    
    // Cargar valores para el filtro de fecha
    const fechas = etiquetas.filter(etiqueta => etiqueta.startsWith('fecha-'));
    cargarOpcionesFiltro('filtro-fecha', fechas, 'fecha-');
    
    // Cargar valores para el filtro de tipo
    const tipos = etiquetas.filter(etiqueta => etiqueta.startsWith('tipo-'));
    cargarOpcionesFiltro('filtro-tipo', tipos, 'tipo-');
    
    // Cargar valores para el filtro de distancia
    const distancias = etiquetas.filter(etiqueta => etiqueta.startsWith('categoria-'));
    cargarOpcionesFiltro('filtro-distancia', distancias, 'categoria-');
    
    // Cargar valores para el filtro de ubicación
    const provincias = etiquetas.filter(etiqueta => etiqueta.startsWith('provincia-'));
    cargarOpcionesFiltro('filtro-ubicacion', provincias, 'provincia-');
}

/**
 * Obtiene todas las etiquetas disponibles en el blog
 */
function obtenerEtiquetasDisponibles() {
    const etiquetas = [];
    
    // Obtener todas las etiquetas de los posts
    const elementosEtiquetas = document.querySelectorAll('.post-labels a');
    elementosEtiquetas.forEach(elemento => {
        const etiqueta = elemento.textContent.trim();
        if (!etiquetas.includes(etiqueta)) {
            etiquetas.push(etiqueta);
        }
    });
    
    return etiquetas;
}

/**
 * Carga las opciones para un filtro específico
 */
function cargarOpcionesFiltro(idFiltro, valores, prefijo) {
    const select = document.getElementById(idFiltro);
    if (!select) return;
    
    // Limpiar opciones existentes excepto la primera (Todos)
    while (select.options.length > 1) {
        select.remove(1);
    }
    
    // Ordenar valores
    valores.sort();
    
    // Agregar nuevas opciones
    valores.forEach(valor => {
        const opcion = document.createElement('option');
        opcion.value = valor;
        
        // Formatear el texto de la opción (quitar el prefijo)
        let textoOpcion = valor.replace(prefijo, '');
        textoOpcion = textoOpcion.replace(/-/g, ' ');
        textoOpcion = textoOpcion.charAt(0).toUpperCase() + textoOpcion.slice(1);
        
        opcion.textContent = textoOpcion;
        select.appendChild(opcion);
    });
}

/**
 * Agrega event listeners a los filtros
 */
function agregarEventListeners() {
    // Event listeners para los selects
    const selects = document.querySelectorAll('.filtro-select');
    selects.forEach(select => {
        select.addEventListener('change', aplicarFiltros);
    });
    
    // Event listener para el botón de limpiar
    const btnLimpiar = document.getElementById('btn-limpiar-filtros');
    if (btnLimpiar) {
        btnLimpiar.addEventListener('click', limpiarFiltros);
    }
}

/**
 * Aplica los filtros seleccionados a las entradas del blog
 */
function aplicarFiltros() {
    // Obtener los valores seleccionados
    const filtroFecha = document.getElementById('filtro-fecha').value;
    const filtroTipo = document.getElementById('filtro-tipo').value;
    const filtroDistancia = document.getElementById('filtro-distancia').value;
    const filtroUbicacion = document.getElementById('filtro-ubicacion').value;
    
    // Obtener todas las entradas del blog
    const entradas = document.querySelectorAll('.post');
    
    // Filtrar las entradas
    entradas.forEach(entrada => {
        const etiquetasEntrada = obtenerEtiquetasEntrada(entrada);
        
        // Verificar si la entrada cumple con todos los filtros seleccionados
        let mostrar = true;
        
        if (filtroFecha && !etiquetasEntrada.includes(filtroFecha)) {
            mostrar = false;
        }
        
        if (filtroTipo && !etiquetasEntrada.includes(filtroTipo)) {
            mostrar = false;
        }
        
        if (filtroDistancia && !etiquetasEntrada.includes(filtroDistancia)) {
            mostrar = false;
        }
        
        if (filtroUbicacion && !etiquetasEntrada.includes(filtroUbicacion)) {
            mostrar = false;
        }
        
        // Mostrar u ocultar la entrada
        entrada.style.display = mostrar ? '' : 'none';
    });
    
    // Actualizar contador de resultados
    actualizarContadorResultados();
}

/**
 * Obtiene las etiquetas de una entrada específica
 */
function obtenerEtiquetasEntrada(entrada) {
    const etiquetas = [];
    
    // Obtener elementos de etiquetas
    const elementosEtiquetas = entrada.querySelectorAll('.post-labels a');
    elementosEtiquetas.forEach(elemento => {
        etiquetas.push(elemento.textContent.trim());
    });
    
    return etiquetas;
}

/**
 * Limpia todos los filtros
 */
function limpiarFiltros() {
    // Resetear todos los selects
    const selects = document.querySelectorAll('.filtro-select');
    selects.forEach(select => {
        select.selectedIndex = 0;
    });
    
    // Mostrar todas las entradas
    const entradas = document.querySelectorAll('.post');
    entradas.forEach(entrada => {
        entrada.style.display = '';
    });
    
    // Actualizar contador de resultados
    actualizarContadorResultados();
}

/**
 * Actualiza el contador de resultados
 */
function actualizarContadorResultados() {
    // Contar entradas visibles
    const entradasVisibles = document.querySelectorAll('.post[style=""], .post:not([style])');
    const total = document.querySelectorAll('.post').length;
    
    // Crear o actualizar el contador
    let contador = document.getElementById('contador-resultados');
    if (!contador) {
        contador = document.createElement('div');
        contador.id = 'contador-resultados';
        contador.className = 'contador-resultados';
        
        const filtrosContainer = document.getElementById('filtros-carreras');
        if (filtrosContainer) {
            filtrosContainer.appendChild(contador);
        }
    }
    
    contador.textContent = `Mostrando ${entradasVisibles.length} de ${total} carreras`;
}

// Agregar estilos CSS para los filtros
function agregarEstilos() {
    const estilos = `
    .filtros-container {
        background-color: #f5f5f5;
        padding: 15px;
        margin-bottom: 20px;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    
    .filtros-container h3 {
        margin-top: 0;
        margin-bottom: 15px;
        color: #333;
    }
    
    .grupo-filtro {
        margin-bottom: 10px;
    }
    
    .grupo-filtro label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
    }
    
    .filtro-select {
        width: 100%;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }
    
    .btn-limpiar {
        background-color: #f44336;
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: 4px;
        cursor: pointer;
        margin-top: 10px;
    }
    
    .btn-limpiar:hover {
        background-color: #d32f2f;
    }
    
    .contador-resultados {
        margin-top: 10px;
        font-style: italic;
        color: #666;
    }
    
    @media (min-width: 768px) {
        .filtros-container {
            display: flex;
            flex-wrap: wrap;
            align-items: flex-end;
        }
        
        .filtros-container h3 {
            width: 100%;
        }
        
        .grupo-filtro {
            flex: 1;
            margin-right: 10px;
            min-width: 200px;
        }
        
        .btn-limpiar {
            align-self: flex-end;
            margin-bottom: 10px;
        }
        
        .contador-resultados {
            width: 100%;
        }
    }
    `;
    
    const styleElement = document.createElement('style');
    styleElement.textContent = estilos;
    document.head.appendChild(styleElement);
}

// Llamar a la función para agregar estilos
agregarEstilos();
