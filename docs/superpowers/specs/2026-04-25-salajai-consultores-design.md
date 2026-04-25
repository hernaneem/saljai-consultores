# Salajai Consultores — Sitio web estático

**Fecha:** 2026-04-25
**Tipo:** Sitio web institucional, una sola página, estático
**Destino de despliegue:** GitHub Pages

## Propósito

Construir un sitio web institucional para Salajai Consultores, una firma de servicios contables y consultoría empresarial. El sitio debe transmitir confianza y profesionalismo (estilo bufete/consultora seria), funcionar como vitrina informativa, y desplegarse en GitHub Pages sin pasos de build.

## Alcance

**Incluye:**
- Una sola página (`index.html`) con cinco secciones de contenido
- CSS plano sin frameworks ni preprocesadores
- JavaScript mínimo (menú móvil + scroll suave)
- Diseño responsivo (móvil, tablet, desktop)
- Contenido en español
- README con instrucciones para activar GitHub Pages

**No incluye:**
- Formularios de contacto, botones de acción, ni integraciones externas
- CMS ni backend
- Build step (sin Vite/webpack/etc.)
- Páginas adicionales o multi-idioma
- Imágenes externas (todos los íconos serán SVG inline)
- Analítica ni cookies

## Stack técnico

| Capa | Decisión | Razón |
|------|----------|-------|
| Markup | HTML5 semántico | Accesibilidad, SEO básico |
| Estilos | CSS puro con variables nativas | Sin build step, fácil de mantener |
| Scripts | JavaScript vanilla | Solo se necesita para menú móvil y scroll suave |
| Tipografía | Google Fonts (Playfair Display + Inter) | Sin descarga local, carga rápida |
| Íconos | SVG inline en HTML | Sin dependencias, control total de color |
| Hosting | GitHub Pages (rama `main`, raíz) | Gratuito, soporta sitios estáticos |

## Estructura de archivos

```
salajai-consultores/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── README.md
└── docs/
    └── superpowers/
        └── specs/
            └── 2026-04-25-salajai-consultores-design.md
```

## Secciones del sitio

### 1. Header (fijo)
- Logo textual: **Salajai Consultores**
- Navegación: Inicio · Nosotros · Servicios · Por qué elegirnos
- En móvil: menú hamburguesa que despliega los enlaces

### 2. Hero
- H1: "Salajai Consultores"
- Subtítulo (debajo del H1): "Soluciones contables y consultoría empresarial para tu negocio"
- Fondo: azul marino sólido (`--color-primary`) con un patrón geométrico sutil generado por CSS
- Texto del hero en blanco hueso para contraste
- Sin botones (no hay CTA por requerimiento del usuario)

### 3. Sobre Nosotros
- Dos columnas en desktop, una en móvil
- Columna izquierda: **Misión** — texto breve (~50 palabras)
- Columna derecha: **Visión** — texto breve (~50 palabras)

### 4. Servicios
- Grid de 5 tarjetas (3 + 2 en desktop, 2 + 2 + 1 en tablet, 1 columna en móvil)
- Cada tarjeta: ícono SVG + título + descripción de 2–3 líneas
- Servicios:
  1. **Contabilidad** — Registro contable, estados financieros, cierre mensual
  2. **Nómina** — Cálculo de nómina, prestaciones, IMSS/INFONAVIT
  3. **Consultoría Fiscal** — Estrategia fiscal, declaraciones, atención SAT
  4. **Auditoría** — Auditoría interna y externa, revisión de cumplimiento
  5. **Asesoría Legal-Laboral** — Contratos, relaciones laborales, normativa

### 5. Por qué elegirnos
- 4 puntos con ícono + título + descripción corta
  1. Experiencia comprobada
  2. Confidencialidad absoluta
  3. Cumplimiento normativo
  4. Atención personalizada

### 6. Footer
- Nombre de la empresa
- Año actual + "Todos los derechos reservados"
- Enlaces de navegación (mismos del header)
- Sin redes sociales ni datos de contacto

## Sistema de diseño

### Paleta

```css
--color-primary: #0A2540;      /* Azul marino — header, fondos hero, títulos */
--color-accent:  #C9A961;      /* Dorado suave — acentos, líneas, íconos */
--color-bg:      #F8F6F0;      /* Blanco hueso — fondo de secciones alternas */
--color-bg-alt:  #FFFFFF;      /* Blanco — fondo de tarjetas */
--color-text:    #1F2937;      /* Gris carbón — texto principal */
--color-muted:   #6B7280;      /* Gris medio — texto secundario */
--color-border:  #E5E7EB;      /* Gris claro — bordes sutiles */
```

### Tipografía

```css
--font-display: 'Playfair Display', Georgia, serif;
--font-body:    'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```

- H1: Playfair Display, 48–64px (responsivo)
- H2: Playfair Display, 32–40px
- H3: Inter, 18–20px, semibold
- Body: Inter, 16px, line-height 1.6

### Espaciado

- Secciones: padding vertical 80–120px (desktop), 48–64px (móvil)
- Contenedor principal: max-width 1200px, padding lateral 24px
- Grid gap: 32px (desktop), 24px (móvil)

## Responsive breakpoints

```css
/* Mobile-first */
@media (min-width: 768px)  { /* tablet */ }
@media (min-width: 1024px) { /* desktop */ }
```

## Comportamiento JavaScript

Único archivo `js/main.js`, con dos funciones:

1. **Menú móvil**: toggle de clase `is-open` en el nav cuando se hace clic en el botón hamburguesa.
2. **Scroll suave**: interceptar clics en enlaces `href="#..."` y desplazar suavemente con offset por el header fijo.

Sin dependencias externas, sin frameworks, sin estado complejo.

## Accesibilidad mínima

- HTML semántico (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`)
- Atributos `aria-label` en elementos interactivos sin texto (botón hamburguesa)
- Contraste de color cumple WCAG AA para texto sobre fondos
- Imágenes/SVGs decorativos con `aria-hidden="true"`
- Navegación por teclado funcional (focus visible)

## Despliegue en GitHub Pages

El README incluirá:
1. `git init` (ya hecho), agregar remote a un repo en GitHub
2. `git push` a `main`
3. En GitHub: Settings → Pages → Source: Deploy from branch → Branch: `main` → `/ (root)`
4. URL del sitio: `https://<usuario>.github.io/<repo>/`

## Criterios de éxito

- [ ] El sitio se ve bien en móvil, tablet y desktop sin scroll horizontal
- [ ] Las 5 secciones aparecen y son navegables por scroll suave
- [ ] El menú hamburguesa funciona en móvil
- [ ] Validación HTML pasa sin errores
- [ ] Lighthouse score >90 en performance, accesibilidad y best-practices
- [ ] Funciona al abrir `index.html` directamente en el navegador (sin servidor)
- [ ] El README explica cómo desplegar en GitHub Pages

## Decisiones explícitas (para evitar ambigüedad)

- **Idioma:** todo el contenido en español de México (terminología fiscal: SAT, IMSS, INFONAVIT)
- **Sin contacto:** confirmado por el usuario, no hay teléfono, email ni formulario
- **Una sola página:** confirmado, no hay rutas adicionales
- **Sin build step:** el repo se despliega tal cual a GitHub Pages
- **Sin imágenes:** todos los gráficos son SVG inline o CSS (sin descargas externas más allá de las fuentes)
