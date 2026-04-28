# Saljai Consultores

Sitio web institucional estático para **Saljai Consultores**, firma de servicios contables y consultoría empresarial.

## Estructura

```
salajai-consultores/
├── index.html       # Página única con todas las secciones
├── css/styles.css   # Estilos
├── js/main.js       # Menú móvil + scroll suave
└── docs/            # Documento de diseño
```

Sin dependencias, sin build step.

## Ver el sitio en local

Solo abre `index.html` en tu navegador. Para una experiencia más cercana a producción puedes levantar un servidor estático:

```bash
# Python (incluido en macOS)
python3 -m http.server 8000

# Luego abre http://localhost:8000
```

## Desplegar en GitHub Pages

1. Crea un repositorio en GitHub (por ejemplo, `salajai-consultores`).
2. Conecta el repositorio local y haz push:

   ```bash
   git remote add origin https://github.com/<tu-usuario>/salajai-consultores.git
   git branch -M main
   git push -u origin main
   ```

3. En GitHub: **Settings → Pages**.
4. En **Source**, elige **Deploy from a branch**.
5. En **Branch**, selecciona `main` y `/ (root)`. Guarda.
6. En unos minutos tu sitio estará disponible en:

   ```
   https://<tu-usuario>.github.io/salajai-consultores/
   ```

## Personalizar

- **Colores y tipografía:** edita las variables CSS al inicio de `css/styles.css` (bloque `:root`).
- **Contenido:** edita los textos directamente en `index.html`.
- **Nuevas secciones:** copia un bloque `<section>` existente y adáptalo.
