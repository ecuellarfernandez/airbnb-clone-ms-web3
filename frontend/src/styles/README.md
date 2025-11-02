# Airbbcitos Design System

Sistema de diseño modular basado en SCSS para el proyecto Airbnb Clone. Proporciona un conjunto completo de variables, utilidades y componentes reutilizables.

## Estructura del Proyecto

```
styles/
├── main.scss                 # Punto de entrada principal
├── abstracts/               # Variables, funciones y configuración
│   ├── _index.scss          # Re-exporta todos los abstracts
│   ├── _colors.scss         # Paleta de colores
│   ├── _data.scss           # Diccionarios de datos
│   ├── _font.scss           # Tipografías y tamaños
│   ├── _theme.scss          # Variables CSS y temas
│   └── _utilities.scss      # Constantes de utilidad
├── base/                    # Estilos base y reset
│   ├── _index.scss          # Re-exporta base modules
│   ├── _reset.scss          # Reset CSS moderno
│   └── _base.scss           # Estilos fundamentales
├── components/              # Componentes UI reutilizables
│   ├── _index.scss          # Re-exporta todos los componentes
│   ├── _button.scss         # Estilos de botones
│   ├── _card.scss           # Estilos de tarjetas
│   └── _input.scss          # Estilos de formularios
├── tools/                   # Mixins y funciones
│   └── _mixins.scss         # Mixins de utilidad
└── utilities/               # Clases de utilidad atómicas
    ├── _index.scss          # Re-exporta todas las utilidades
    ├── _colors.scss         # Utilidades de color
    ├── _typography.scss     # Utilidades de tipografía
    ├── _spacing.scss        # Utilidades de espaciado
    ├── _sizing.scss         # Utilidades de tamaño
    ├── _layout.scss         # Utilidades de layout
    └── _effects.scss        # Utilidades de efectos
```

## Instalación y Uso

### Importar en tu proyecto Angular

El archivo principal `main.scss` ya está configurado en `angular.json`. Si necesitas importarlo manualmente:

```scss
// En tu archivo de estilos global o componente
@use 'path/to/styles/main.scss';
```

### Uso en componentes

```typescript
// En tu componente Angular
@Component({
  selector: 'app-example',
  template: '...',
  styleUrls: ['./example.component.scss']
})
```

```scss
// En example.component.scss
// Puedes usar las variables del tema
.custom-element {
  background-color: var(--brand-primary);
  color: var(--on-brand-primary);
  padding: var(--space-4);
  border-radius: var(--radius-md);
}
```

## Sistema de Colores

### Colores de Marca

```scss
// Primario (Airbnb rosa)
--brand-primary: #ff385c
--brand-primary-hover: #dc0e63
--brand-primary-active: #ff385c
--on-brand-primary: #f6f6f8

// Secundario (Púrpura)
--brand-secondary: #991dff
--brand-secondary-hover: #6612a7
--brand-secondary-active: #2d0849
--on-brand-secondary: #f6f6f8
```

### Colores Neutrales

Escala completa de grises desde `neutral-0` (blanco) hasta `neutral-950` (casi negro).

```html
<!-- Ejemplo de uso -->
<div class="bg-neutral-100 text-neutral-900">Contenido</div>
```

### Colores de Acento

- `accent-pink` - Rosa vibrante
- `accent-teal` - Verde azulado
- `accent-amber` - Ámbar/Naranja
- `accent-violet` - Violeta

### Colores de Estado

- `state-success` - Verde para éxito
- `state-warning` - Ámbar para advertencias
- `state-error` - Rojo para errores
- `state-info` - Azul para información

## Componentes

### Botones

```html
<!-- Variantes -->
<button class="btn btn-primary">Primario</button>
<button class="btn btn-secondary">Secundario</button>
<button class="btn btn-outline">Outline</button>
<button class="btn btn-ghost">Ghost</button>
<button class="btn btn-danger">Peligro</button>

<!-- Tamaños -->
<button class="btn btn-primary btn-sm">Pequeño</button>
<button class="btn btn-primary">Normal</button>
<button class="btn btn-primary btn-lg">Grande</button>
<button class="btn btn-primary btn-xl">Extra Grande</button>

<!-- Ancho completo -->
<button class="btn btn-primary btn-block">Ancho Completo</button>

<!-- Botones de icono -->
<button class="btn btn-icon">
  <i class="icon"></i>
</button>
```

### Tarjetas (Cards)

```html
<!-- Tarjeta básica -->
<div class="card">
  <div class="card-header">
    <h3>Título</h3>
  </div>
  <div class="card-body">
    <p>Contenido de la tarjeta</p>
  </div>
  <div class="card-footer">
    <button class="btn btn-primary">Acción</button>
  </div>
</div>

<!-- Variantes -->
<div class="card card-elevated">Tarjeta elevada</div>
<div class="card card-bordered">Tarjeta con borde</div>
```

### Formularios (Inputs)

```html
<!-- Input básico -->
<div class="input-group">
  <label class="input-label">Email</label>
  <input type="email" class="input" placeholder="tu@email.com">
  <span class="input-helper-text">Te enviaremos confirmación</span>
</div>

<!-- Input con error -->
<div class="input-group">
  <label class="input-label">Contraseña</label>
  <input type="password" class="input input-error">
  <span class="input-error-message">La contraseña es requerida</span>
</div>

<!-- Tamaños -->
<input type="text" class="input input-sm" placeholder="Pequeño">
<input type="text" class="input" placeholder="Normal">
<input type="text" class="input input-lg" placeholder="Grande">

<!-- Textarea -->
<textarea class="input textarea" placeholder="Escribe algo..."></textarea>

<!-- Select -->
<select class="input select">
  <option>Opción 1</option>
  <option>Opción 2</option>
</select>

<!-- Checkbox y Radio -->
<input type="checkbox" class="checkbox">
<input type="radio" class="radio">
```

## 🛠Utilidades

### Colores

```html
<!-- Texto -->
<p class="text-brand-primary">Texto primario</p>
<p class="text-neutral-600">Texto neutral</p>

<!-- Fondo -->
<div class="bg-surface">Fondo superficie</div>
<div class="bg-brand-secondary">Fondo secundario</div>

<!-- Estados hover -->
<div class="hover:bg-surface-hover">Hover background</div>
```

### Tipografía

```html
<!-- Familias de fuente -->
<h1 class="font-display">Título con Airbbcitos</h1>
<p class="font-body">Texto con Inter</p>

<!-- Tamaños de fuente -->
<p class="fs-xs">Extra pequeño</p>
<p class="fs-sm">Pequeño</p>
<p class="fs-md">Mediano</p>
<p class="fs-lg">Grande</p>
<p class="fs-xl">Extra grande</p>

<!-- Peso de fuente -->
<p class="fw-light">Light (200)</p>
<p class="fw-regular">Regular (300)</p>
<p class="fw-medium">Medium (500)</p>
<p class="fw-bold">Bold (700)</p>

<!-- Altura de línea -->
<p class="lh-tight">Compacto</p>
<p class="lh-normal">Normal</p>
```

### Espaciado

```html
<!-- Padding -->
<div class="p-4">Padding 1rem</div>
<div class="px-6">Padding horizontal 1.5rem</div>
<div class="py-8">Padding vertical 2rem</div>
<div class="pt-2 pr-4 pb-2 pl-4">Padding individual</div>

<!-- Margin -->
<div class="m-4">Margin 1rem</div>
<div class="mx-auto">Margin horizontal auto</div>
<div class="my-6">Margin vertical 1.5rem</div>
<div class="-mt-2">Margin top negativo</div>

<!-- Gap -->
<div class="flex gap-4">Items con gap</div>
<div class="space-x-3">Espaciado horizontal entre hijos</div>
<div class="space-y-2">Espaciado vertical entre hijos</div>
```

### Layout

```html
<!-- Display -->
<div class="flex">Flexbox</div>
<div class="grid">Grid</div>
<div class="block">Block</div>
<div class="inline-block">Inline-block</div>

<!-- Flexbox -->
<div class="flex flex-col items-center justify-between">
  <!-- Flex column, items centrados, justify space-between -->
</div>

<div class="flex flex-row flex-wrap gap-4">
  <!-- Flex row con wrap y gap -->
</div>

<!-- Grid -->
<div class="grid grid-cols-3 gap-4">
  <!-- Grid de 3 columnas con gap -->
</div>

<!-- Alineación -->
<div class="flex items-center">Centrado vertical</div>
<div class="flex justify-center">Centrado horizontal</div>
<div class="flex items-center justify-center">Centrado total</div>

<!-- Container -->
<div class="container">Contenedor con max-width</div>
<div class="content">Contenedor de contenido</div>

<!-- Posición -->
<div class="relative">Posición relativa</div>
<div class="absolute">Posición absoluta</div>
<div class="fixed">Posición fija</div>
<div class="sticky top-20">Sticky con top</div>

<!-- Alineación de texto -->
<p class="text-left">Izquierda</p>
<p class="text-center">Centro</p>
<p class="text-right">Derecha</p>
```

### Tamaños

```html
<!-- Ancho -->
<div class="w-full">100% de ancho</div>
<div class="w-half">50% de ancho</div>
<div class="w-sm">320px de ancho</div>
<div class="max-w-container">Ancho máximo contenedor</div>

<!-- Alto -->
<div class="h-full">100% de alto</div>
<div class="h-screen-80vh">80vh de alto</div>
<div class="min-h-screen">Mínimo altura de viewport</div>
```

### Efectos

```html
<!-- Border radius -->
<div class="rounded-sm">Radio pequeño</div>
<div class="rounded-md">Radio mediano</div>
<div class="rounded-lg">Radio grande</div>
<div class="rounded-pill">Radio píldora</div>

<!-- Sombras -->
<div class="shadow-sm">Sombra pequeña</div>
<div class="shadow-md">Sombra mediana</div>
<div class="shadow-lg">Sombra grande</div>
<div class="shadow-xl">Sombra extra grande</div>

<!-- Bordes -->
<div class="border">Borde 1px</div>
<div class="border-2">Borde 2px</div>
<div class="border-none">Sin borde</div>

<!-- Aspect ratio -->
<img class="aspect-square object-cover" src="...">
<img class="aspect-video object-contain" src="...">

<!-- Overflow -->
<div class="overflow-hidden">Overflow oculto</div>

<!-- Visibilidad -->
<div class="hidden">Oculto</div>

<!-- Cursor -->
<div class="pointer">Cursor pointer</div>
```

## Soporte para Tema Oscuro

El sistema incluye soporte automático para tema oscuro usando `prefers-color-scheme` o el atributo `data-theme`:

```html
<!-- Forzar tema oscuro -->
<html data-theme="dark">
```

Las variables CSS se ajustan automáticamente:
- Fondos oscuros
- Textos claros
- Bordes ajustados
- Superficies invertidas

## Responsive Design

Todas las utilidades soportan breakpoints:

```html
<!-- Se aplica solo en sm (640px) y superiores -->
<div class="sm:flex md:grid lg:grid-cols-4">
  Responsive layout
</div>
```

Breakpoints disponibles:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

## Variantes de Estado

Algunas utilidades soportan estados interactivos:

```html
<!-- Hover -->
<div class="bg-surface hover:bg-surface-hover">
  Cambia al pasar el mouse
</div>

<!-- Focus -->
<input class="border-neutral-300 focus:border-brand-primary">

<!-- Active -->
<button class="active:bg-brand-primary-active">
  Cambia al hacer click
</button>
```

## Personalización

### Variables CSS Principales

Puedes sobrescribir las variables CSS en tu proyecto:

```scss
:root {
  // Colores de marca personalizados
  --brand-primary: #your-color;
  
  // Espaciado personalizado
  --space-custom: 3.5rem;
  
  // Border radius personalizado
  --radius-custom: 1.5rem;
}
```

### Extender el Sistema

Para añadir nuevas utilidades o componentes:

1. Crea un nuevo archivo en la carpeta correspondiente
2. Impórtalo en el archivo `_index.scss` de esa carpeta
3. El sistema lo incluirá automáticamente

```scss
// styles/components/_modal.scss
.modal {
  // Tus estilos
}

// styles/components/_index.scss
@forward './modal';
```

## Mejores Prácticas

1. **Usa variables CSS** para colores, espaciado y otros valores reutilizables
2. **Prefiere utilidades** sobre estilos personalizados cuando sea posible
3. **Sigue la nomenclatura BEM** para componentes personalizados
4. **Usa clases semánticas** que describan el propósito, no la apariencia
5. **Mantén la especificidad baja** para facilitar sobrescrituras
6. **Agrupa estilos relacionados** en componentes reutilizables
