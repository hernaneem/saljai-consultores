# Checklist de pruebas — Saljai Consultores (ola website-creator)
> Para Hernán, 6 oct 2026. Cubre la rama `ola/website-creator` (tickets #2–#5).
> Se prueba en la **vista previa** de Vercel (pide tu login de Vercel): https://saljai-consultores-git-ola-w-960d0f-hernan-echeverrias-projects.vercel.app
> Los textos legales son borradores con `[FALTA DATO]`: no se publican en producción hasta tener los datos de Saljai.
> Para retomar con Claude: `claude --continue`

## 0. Preparación
- [ ] Abre la vista previa en Chrome con tu sesión de Vercel. Unos 10 minutos.

## 1. Primera impresión
- [ ] En el celular (o Chrome en modo móvil, 375 px) → el botón **Escríbenos** se ve sin bajar, debajo del título.
- [ ] En escritorio → el diseño es el de siempre. Compara con `docs/qa/capturas-2026-10-06/` (antes y después).
- [ ] Las cursivas de "Consultores" y del título se ven un poco distintas → ahora son la cursiva real de Playfair (antes el navegador inclinaba la letra). Confirma que te gusta; si no, se puede volver a la inclinada.

## 2. Contacto
- [ ] Toca **Escríbenos** → se abre tu correo con destinatario `contacto@ips.com.mx` (decisión S2).
- [ ] Baja al final de la página → está otra vez el botón Escríbenos.

## 3. Cookies
- [ ] Al entrar aparece el banner con **Aceptar** y **Rechazar** del mismo tamaño.
- [ ] Toca **Rechazar**, recarga → el banner no vuelve.
- [ ] En el pie toca **Cookies** → reaparece el banner.

## 4. Páginas nuevas
- [ ] Pie → **Aviso de privacidad** → abre con el mismo estilo; tiene recuadro de borrador y `[FALTA DATO]` donde faltan datos de Saljai.
- [ ] En el aviso busca el `[VERIFICAR]` sobre el buzón de ips.com.mx → dime si IPS es la responsable, una encargada o un tercero.
- [ ] Pie → **Términos de uso** → mismo estilo, con `[FALTA DATO]`.
- [ ] Escribe una dirección inventada (`/no-existe`) → sale la 404 propia con botón al inicio.

## 5. Compartir
- [ ] Pega el link de producción (`https://saljai-consultores.vercel.app`) en WhatsApp **después del merge** → sale la tarjeta con la imagen de Saljai.

## Nuevo de la sesión 6 oct 2026
- [ ] Todo lo de arriba es nuevo de esta ola.

## Qué NO está construido aún
- **Formulario:** fuera hasta que Saljai tenga dominio (decisión S2).
- **Dominio propio:** no se sabe si existe; el sitio vive en `saljai-consultores.vercel.app`.
- **GA4:** apagado hasta abrir la cuenta (🟡 en el punto 19).
- **Producción:** el merge a `main` espera los datos legales de Saljai (D3). Mientras, `saljai-consultores.vercel.app` muestra el sitio anterior más la configuración de Vercel.
- **Repo privado (S6):** después de que la producción en Vercel tenga esta versión.
- Tres íconos del sitio original (`bxs-balance`, `bxs-radar`, `bxs-trending-up`) no existen en Boxicons y nunca se vieron; se quedaron igual.
