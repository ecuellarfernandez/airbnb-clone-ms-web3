# Guía Rápida - Airbbcitos Design System

## Inicio Rápido en 2 Minutos

### 1. Importación Automática
Los estilos ya están configurados en `angular.json`. No necesitas hacer nada adicional.

### 2. Usa Clases de Utilidad

```html
<!-- Botón primario -->
<button class="btn btn-primary">¡Clic aquí!</button>

<!-- Card con contenido -->
<div class="card p-6">
  <h3 class="fs-lg fw-bold mb-4">Título</h3>
  <p class="text-2">Descripción del contenido</p>
</div>

<!-- Layout flex centrado -->
<div class="flex items-center justify-center gap-4">
  <span>Item 1</span>
  <span>Item 2</span>
</div>
```

### 3. Usa Variables CSS

```scss
// En tu archivo .scss de componente
.mi-elemento {
  background: var(--brand-primary);
  color: var(--on-brand-primary);
  padding: 1rem;
  border-radius: var(--radius-md);
}
```

## Cheatsheet - Clases Más Usadas

### Layout & Flexbox
```html
<div class="flex">                    <!-- display: flex -->
<div class="flex-col">                <!-- flex-direction: column -->
<div class="items-center">            <!-- align-items: center -->
<div class="justify-between">         <!-- justify-content: space-between -->
<div class="gap-4">                   <!-- gap: 1rem -->
<div class="grid grid-cols-3">        <!-- grid con 3 columnas -->
<div class="container">               <!-- contenedor con max-width -->
```

### Espaciado
```html
<div class="p-4">                     <!-- padding: 1rem -->
<div class="px-6">                    <!-- padding-left/right: 1.5rem -->
<div class="py-8">                    <!-- padding-top/bottom: 2rem -->
<div class="m-4">                     <!-- margin: 1rem -->
<div class="mx-auto">                 <!-- margin-left/right: auto -->
<div class="space-y-4">               <!-- gap vertical entre hijos -->
```

### Colores
```html
<div class="bg-surface">              <!-- fondo superficie -->
<div class="bg-brand-primary">        <!-- fondo color marca -->
<div class="text-neutral-900">        <!-- texto oscuro -->
<div class="text-brand-primary">      <!-- texto color marca -->
<div class="border-color-neutral-200"><!-- color de borde -->
```

### Tipografía
```html
<h1 class="font-display">             <!-- fuente Airbbcitos -->
<p class="fs-lg">                     <!-- font-size grande -->
<span class="fw-bold">                <!-- font-weight bold -->
<p class="text-center">               <!-- text-align center -->
```

### Tamaños
```html
<div class="w-full">                  <!-- width: 100% -->
<div class="h-screen-80vh">           <!-- height: 80vh -->
<div class="max-w-lg">                <!-- max-width: 512px -->
<div class="min-h-screen">            <!-- min-height: 100vh -->
```

### Efectos
```html
<div class="rounded-md">              <!-- border-radius mediano -->
<div class="shadow-lg">               <!-- box-shadow grande -->
<div class="overflow-hidden">         <!-- overflow: hidden -->
<img class="aspect-square object-cover"> <!-- ratio 1:1 con cover -->
```

## Componentes Listos

### Botones
```html
<!-- Estilos: primary, secondary, outline, ghost, danger -->
<!-- Tamaños: btn-sm, (normal), btn-lg, btn-xl -->
<button class="btn btn-primary">Primario</button>
<button class="btn btn-outline btn-sm">Outline Pequeño</button>
<button class="btn btn-danger btn-lg">Peligro Grande</button>
<button class="btn btn-icon"><i class="icon-home"></i></button>
```

### Cards
```html
<div class="card card-elevated">
  <img src="..." class="card-image">
  <div class="card-body">
    <h3>Título</h3>
    <p>Contenido</p>
  </div>
  <div class="card-footer">
    <button class="btn btn-primary">Acción</button>
  </div>
</div>
```

### Inputs
```html
<div class="input-group">
  <label class="input-label">Nombre</label>
  <input type="text" class="input" placeholder="Tu nombre">
  <span class="input-helper-text">Ayuda</span>
</div>

<!-- Con error -->
<input type="email" class="input input-error">
<span class="input-error-message">Email inválido</span>
```

## Variables CSS Principales

```css
/* Colores */
--brand-primary: #ff385c
--brand-secondary: #991dff
--neutral-{0-950}: Escala de grises
--accent-{pink|teal|amber|violet}: Colores de acento
--state-{success|warning|error|info}: Estados

/* Espaciado */
--space-{1-20}: 0.25rem a 5rem

/* Tipografía */
--font-display: Airbbcitos
--font-body: Inter
--fs-{xs|sm|md|lg|xl}: Tamaños de fuente
--fw-{light|regular|medium|bold}: Pesos de fuente

/* Bordes */
--radius-{sm|md|lg|xl|pill}: Border radius

/* Otros */
--transition-duration: 200ms
--z-{header|overlay|dropdown}: Z-index
```

## Responsive

Prefija cualquier clase con `sm:`, `md:`, `lg:`, `xl:`

```html
<!-- Flex en móvil, grid en desktop -->
<div class="flex lg:grid lg:grid-cols-3">
  ...
</div>

<!-- Padding responsive -->
<div class="p-4 md:p-8 lg:p-12">
  ...
</div>
```

## Estados Interactivos

```html
<!-- Cambios al hover -->
<div class="bg-surface hover:bg-surface-hover">
  Pasa el mouse
</div>

<!-- Cambios al focus -->
<input class="border-neutral-300 focus:border-brand-primary">

<!-- Con tema oscuro -->
<div class="bg-neutral-100 dark:bg-neutral-900">
  Se adapta al tema
</div>
```

## Tips Rápidos

1. **Combina utilidades** en lugar de escribir CSS personalizado
2. **Usa variables CSS** para valores dinámicos
3. **Responsive first**: Empieza con móvil y agrega breakpoints
4. **Componentes sobre utilidades**: Para elementos complejos repetidos
5. **gap > margin**: Prefiere `gap` en flex/grid sobre margins individuales

## Enlaces Útiles

- [README Completo](./README.md) - Documentación detallada
- Estructura: `styles/{abstracts,base,components,utilities}`
- Paleta en: `abstracts/_colors.scss`
- Componentes en: `components/*.scss`



