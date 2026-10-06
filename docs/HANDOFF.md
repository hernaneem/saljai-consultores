# HANDOFF — Saljai Consultores

**Qué es:** sitio estático de una página (más aviso, términos y 404) de Saljai Consultores. Aplica `website-creator` (20 puntos). Spec: `docs/specs/2026-10-06-website-creator-saljai.md` (S1–S7). Checklist: `docs/qa/2026-10-06-checklist.md`.

**Infra:** Vercel Pro de Hernán, proyecto `saljai-consultores` (`prj_rAjwQBHLGWADF9uqpmFe61PYtu6S`), conectado a `hernaneem/saljai-consultores`. `main` → producción en `saljai-consultores.vercel.app`; cada rama → vista previa protegida (verificar con el link temporal del MCP, D24 de la skill). `.vercelignore` deja fuera docs y archivos del repo. Fuentes e íconos alojados en `fonts/` (licencias OFL y MIT ahí mismo). GitHub Pages sigue activo en `hernaneem.github.io/saljai-consultores` hasta apagarlo.

**Hecho (6 oct 2026):** tickets #2–#5 en `ola/website-creator`; revisión de cierre aplicada; semáforo de la vista previa: 16 🟢, 17 ⚪, 19 🟡, 1 y 2 🔴 solo por `[FALTA DATO]`.

**Pendiente:**
| Qué | Depende de |
|---|---|
| Datos legales de Saljai (razón social, RFC, domicilio, correo de privacidad, jurisdicción) y quién es IPS (`[VERIFICAR]` del aviso) | Hernán |
| Merge de `ola/website-creator` a `main` (= producción en Vercel) | Hernán, con los datos |
| Apagar GitHub Pages y poner el repo privado (S6) | Claude, después del merge |
| Dominio propio, si existe | Hernán |
