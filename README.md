# Destino Aventura - Template para Blogger

Template personalizado para el blog "Destino Aventura", especializado en carreras deportivas con un sistema de filtrado avanzado.

## Características

- Diseño moderno con tarjetas para las carreras
- Sistema de filtrado por fecha, tipo de carrera, distancia y ubicación
- Diseño responsive para todos los dispositivos
- Animaciones suaves y efectos visuales
- Etiquetas visuales para tipos de carrera y distancias

## Estructura de Archivos

- **template_parte1.xml**: Cabecera y configuración inicial
- **template_parte2.xml**: Sistema de filtrado
- **template_parte3.xml**: Estructura principal del contenido
- **template_parte4.xml**: Plantilla para entradas individuales (tarjetas)
- **template_parte5.xml**: Pie de página y scripts
- **estilos_tarjetas.css**: Estilos para las tarjetas de carreras
- **estilos_filtros.css**: Estilos para el sistema de filtrado
- **script_tarjetas.js**: Funcionalidad para tarjetas y filtrado

## Instrucciones de Uso

### Formato de Etiquetas

Para que el sistema de filtrado funcione correctamente, las entradas deben etiquetarse con el siguiente formato:

1. **Fecha**: `fecha-MM-AAAA` (ej: fecha-05-2025)
2. **Tipo**: `tipo-XXXX` (ej: tipo-trail, tipo-calle)
3. **Categoría**: `categoria-XXX` (ej: categoria-5k, categoria-21k)
4. **Ubicación**: `localidad-XXXX` (ej: localidad-buenos-aires)

### Instalación en Blogger

1. Accede al panel de administración de Blogger
2. Ve a "Tema" > "Editar HTML"
3. Borra todo el contenido existente
4. Copia y pega el contenido de todos los archivos XML en orden (parte1, parte2, etc.)
5. Guarda los cambios

### Personalización

Puedes personalizar los colores y estilos modificando los archivos CSS:

- Para cambiar los colores de las tarjetas, edita `estilos_tarjetas.css`
- Para modificar el aspecto del sistema de filtrado, edita `estilos_filtros.css`

## Dependencias Externas

- [Normalize.css](https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css)
- [Animate.css](https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css)
- [Google Fonts - Poppins](https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap)

## Compatibilidad

Este template es compatible con las últimas versiones de Blogger y funciona en todos los navegadores modernos.

## Notas Importantes

- Antes de implementar en producción, asegúrate de reemplazar "USUARIO/REPOSITORIO" en los archivos XML con tu nombre de usuario y repositorio de GitHub.
- Para un rendimiento óptimo, se recomienda usar un CDN como jsDelivr para servir los archivos CSS y JavaScript desde GitHub.
