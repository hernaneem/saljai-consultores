# Saljai Consultores: los 20 puntos y la mudanza a Vercel — Spec
> 2026-10-06 · Estado: en revisión de Hernán

## Problema

La auditoría de `website-creator` (6 oct 2026, modo carpeta) dio 🔴 en 12 de los 20 puntos:
- no hay aviso de privacidad, términos ni banner de cookies;
- faltan metas, la tarjeta al compartir, el favicon, robots y sitemap;
- la 404 no enlaza al inicio;
- Lighthouse móvil da 87 (LCP 3.0 s) y hay textos con contraste insuficiente;
- el `.gitignore` no existe.

Además, el sitio no tiene ningún medio de contacto. Vive en GitHub Pages bajo `hernaneem.github.io/saljai-consultores`, sin dominio, en un repo público.

## Solución

El sitio conserva su diseño y su contenido, y se completan los 20 puntos con las piezas de `website-creator`. Se publica en el Vercel Pro de Hernán en una dirección `*.vercel.app`, con una vista previa por rama. El visitante tiene un CTA claro, "Escríbenos", que abre un correo a `contacto@ips.com.mx` sin que la dirección esté en el HTML. Los textos legales salen de `legal-mx` con `[FALTA DATO]` donde falten los datos de Saljai, y por eso el sitio no pasa a producción hasta tenerlos.

## Historias de usuario

1. Como visitante, quiero ver en la primera pantalla cómo contactar a Saljai, para escribir sin buscar.
2. Como visitante, quiero que el botón "Escríbenos" abra mi correo con la dirección de Saljai, también al final de la página.
3. Como visitante, quiero rechazar las cookies con la misma facilidad que aceptarlas.
4. Como visitante, quiero leer el aviso de privacidad y los términos desde el pie de la página.
5. Como visitante en celular, quiero que el sitio cargue en menos de 2.5 s y se lea bien.
6. Como visitante que llega a una dirección que no existe, quiero una página que me regrese al inicio.
7. Como Hernán, quiero que al compartir el link en WhatsApp salga la tarjeta con la imagen de Saljai.
8. Como Hernán, quiero cada cambio en una vista previa de Vercel con su semáforo antes de decidir el merge.
9. Como Hernán, quiero que el sitio no pase a producción mientras tenga `[FALTA DATO]`.
10. Como Hernán, quiero que el repo quede privado cuando el sitio viva en Vercel.

## Decisiones

**S1 (VoBo Hernán 2026-10-06, Q3/Q4):** El sitio se publica en el Vercel Pro de Hernán, proyecto `saljai-consultores`, conectado al repo: cada rama genera una vista previa y `main` publica en `saljai-consultores.vercel.app`. No hay dominio por ahora. GitHub Pages se apaga cuando la producción de Vercel esté arriba. Descartado: seguir en GitHub Pages, por sus reglas de uso y porque no deja poner HSTS (D9 de la skill).

**S2 (VoBo Hernán 2026-10-06, Q5/Q10):** Sin formulario, porque Resend necesita un dominio. El CTA principal es "Escríbenos" y abre un correo a `contacto@ips.com.mx`. La dirección se arma con la pieza de contacto oculto y no queda en el HTML. El CTA va marcado `data-cta="principal"` en la primera pantalla y `data-cta="final"` al final. Por eso los puntos 17 y la parte de formulario del 18 salen ⚪.

**S3 (VoBo Hernán 2026-10-06, Q6):** El aviso de privacidad del sitio (con su sección de cookies) y los términos de uso salen de `legal-mx`, con `[FALTA DATO]` en la razón social, el RFC, el domicilio y el correo de privacidad de Saljai. Se enlazan desde el pie. Mientras haya `[FALTA DATO]`, los puntos 1 y 2 quedan en 🔴 y el merge a `main` espera los datos (D3 de la skill).

**S4 (VoBo Hernán 2026-10-06, Q7):** Se conserva el diseño actual. Solo cambia lo que exigen los puntos: tonos de texto para llegar a WCAG AA y la carga de las fuentes y los íconos para bajar el LCP. Cada cambio visual se compara con capturas de antes y después.

**S5 (VoBo Hernán 2026-10-06, D6 de la skill):** Banner de cookies de la pieza con GA4 listo y apagado (`data-ga4-id=""`), así que el punto 19 queda en 🟡.

**S6 (propuesta, Q9):** El repo `hernaneem/saljai-consultores` pasa a privado cuando la producción en Vercel esté arriba. Hoy es público.

**S7 (propuesta):** Las páginas nuevas (`aviso-de-privacidad.html`, `terminos.html`, `404.html`) siguen el estilo de `index.html` y comparten `css/styles.css`. `vercel.json` activa `cleanUrls`, de modo que las rutas quedan sin `.html`, como pide el contrato de la skill.

## Testing

Seam único: `verificar-sitio` de `website-creator`.
- En modo carpeta sobre el repo, mientras se construye.
- Contra la vista previa de Vercel al cerrar cada ticket, con un token de bypass nuevo que se revoca al terminar (D23).

Las revisiones a mano (banner, 375 px, CTA, textos legales) se hacen con Playwright. Este repo no tiene pruebas propias ni las necesita: el sitio no tiene lógica más allá del menú.

## Producción

- Capa 1: sin llaves; el `.gitignore` cubre `.env*`.
- Capa 5: Vercel con HTTPS y HSTS automáticos.
- Capa 6: cabeceras de seguridad básicas en `vercel.json`.
- Las demás capas no aplican: no hay formulario, datos, APIs ni usuarios.

## Fuera de alcance

- Formulario de contacto: cuando Saljai tenga dominio y se verifique en Resend.
- Dominio propio: Hernán no recuerda si existe. Queda en `*.vercel.app` hasta que aparezca.
- GA4: cuando haya cuenta (D6).
- Contenido nuevo o rediseño: explícitamente nunca en esta ola.

## Criterios de aceptación

1. `verificar-sitio` sobre la vista previa da 🟢 en todos los puntos, salvo 🔴 en 1 y 2 por `[FALTA DATO]`, 🟡 en 19 (GA4 apagado) y ⚪ en 17 y en la parte de formulario del 18.
2. "Escríbenos" aparece en la primera pantalla en móvil y escritorio, y otra vez al final. Abre un correo a `contacto@ips.com.mx`, y la dirección no está en el HTML.
3. Rechazar las cookies se recuerda al recargar, y nada de Google carga antes de aceptar.
4. Lighthouse móvil da 90 o más en las cuatro categorías, con LCP menor a 2.5 s.
5. Una ruta inexistente responde 404 con la página propia y un enlace al inicio.
6. Las capturas de antes y después muestran el mismo diseño, salvo los tonos ajustados.
7. Hernán ve la vista previa y su semáforo antes del merge.

## Preguntas abiertas

1. **S6 y S7** son propuestas (Q9 sigue abierta). Propuesta: aprobarlas tal cual. Contesta: Hernán.
