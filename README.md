# COSMO-DATE

Este repositorio tiene dos partes:

- `frontend/`: **PWA web móvil** hecha con Expo + React Native Web.
- `backend/`: API en Python.

## Modelo de despliegue (lo importante)

Este proyecto está orientado a **PWA web** (no app nativa Android/iOS).

Evidencia en configuración:

- `frontend/app.json` solo define bloque `web` y no incluye `ios` ni `android`.
- `frontend/package.json` usa `expo start --web` como script por defecto.

En otras palabras: la app se prepara para abrirse en navegador móvil y funcionar como web app instalable (PWA), sin importar la marca/modelo del celular.

## ¿Cómo ver visualmente cómo va quedando la app?

Desde `frontend/`:

1. Instala dependencias:

   ```bash
   npm install
   ```

2. Inicia en modo web:

   ```bash
   npm run start
   ```

3. Abre la URL local en tu navegador:
   - En tu computadora para desarrollo rápido.
   - En tu celular (misma red), abriendo la URL que muestra Expo.

4. Para probar la experiencia PWA en móvil:
   - Android (Chrome): menú → **Agregar a pantalla principal**.
   - iPhone (Safari): compartir → **Añadir a pantalla de inicio**.

## Flujo recomendado de trabajo

- Edita pantallas en `frontend/app/`.
- Guarda y usa **Fast Refresh**.
- Si no refresca, recarga manualmente el navegador.

## Backend local

Para backend revisa:

- `backend/server.py`
- `backend/requirements.txt`

## EAS / Expo.dev

Si ejecutas comandos de EAS desde la raíz del repositorio, EAS CLI espera encontrar `eas.json` en la raíz (`/COSMO-DATE/eas.json`).

- Ya se incluye `eas.json` a nivel raíz para evitar el error: `Failed to read "/COSMO-DATE/eas.json"`.
- También puedes ejecutar comandos entrando a `frontend/` si prefieres trabajar solo en esa carpeta.

- Si también aparece `Failed to read "/cosmo-date/package.json"`, usa el `package.json` de la raíz (incluido en el repo) o ejecuta comandos dentro de `frontend/`.

## GitHub Free: despliegue y paquetes sin costo

Esta configuración funciona en plan **GitHub Free** para repos públicos:

- CI automático con pruebas (`pytest`) y lint de frontend en cada `push` y `pull_request`.
- Deploy automático a **GitHub Pages** en `main` compilando la PWA de Expo (`expo export --platform web`).
- Soporte de autenticación para **GitHub Packages (npm.pkg.github.com)** usando `NODE_AUTH_TOKEN`.

### Requisitos para que funcione en GitHub

1. Activar Pages en el repositorio usando **GitHub Actions** como fuente de despliegue.
2. Mantener el repositorio público para Pages en cuenta Free.
3. Si usas paquetes privados en GitHub Packages, define el secret `NODE_AUTH_TOKEN` (PAT o `GITHUB_TOKEN` según el caso).

