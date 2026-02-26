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


## Configuración rápida para que la PWA funcione end-to-end

1. Backend (API):

   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn server:app --reload --host 0.0.0.0 --port 8001
   ```

2. Frontend (PWA web):

   ```bash
   cd frontend
   printf "EXPO_PUBLIC_BACKEND_URL=http://localhost:8001\n" > .env
   npm install
   npm run start
   ```

3. Variable importante:
   - `EXPO_PUBLIC_BACKEND_URL` debe apuntar al backend (ejemplo local `http://localhost:8001`).

Si no defines `EXPO_PUBLIC_BACKEND_URL`, el frontend intentará usar una configuración local segura para desarrollo.

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

## ¿Dónde la puedo testear antes de publicarla?

Tienes 3 opciones recomendadas:

1. **Local (rápido para desarrollo diario)**
   - Levanta backend en `http://localhost:8001`.
   - Levanta frontend con Expo Web y prueba en `http://localhost:8081` (o el puerto que te indique Expo).

2. **Celular en tu misma red (prueba real de PWA)**
   - Con el frontend corriendo, abre desde tu celular la URL local que muestra Expo.
   - Instálala como PWA desde el navegador para validar icono, navegación y rendimiento.

3. **Preview/Publicación en GitHub Pages (preproducción/producción)**
   - Haz push de tu rama y revisa que CI pase (`pytest` + `lint`).
   - Al mergear a `main`, GitHub Actions publica automáticamente en Pages.
   - URL esperada: `https://<tu-usuario>.github.io/<tu-repo>/`.

> Sugerencia: para pruebas fuera de local, apunta `EXPO_PUBLIC_BACKEND_URL` a una API pública (Render/Railway/Fly.io o similar).

## Compatibilidad en navegadores iOS y Android

La PWA ya está preparada para usarse desde navegadores móviles:

- **iOS (Safari):** abrir la URL y usar **Compartir → Añadir a pantalla de inicio**.
- **Android (Chrome/Edge):** abrir la URL y usar **Agregar a pantalla principal / Instalar app**.

Para maximizar compatibilidad móvil al publicar:

1. Publica frontend en GitHub Pages.
2. Usa backend público HTTPS (Render/Railway/Fly.io).
3. Configura `EXPO_PUBLIC_BACKEND_URL` con esa URL HTTPS.
4. Prueba la URL final en Safari iOS y Chrome Android.

## Sitios web recomendados para testearla y verla funcionar

Si quieres probarla "en vivo" y validar comportamiento real, estos son los más útiles:

1. **GitHub Pages** (hosting estático gratis para la PWA)
   - Sitio: https://pages.github.com/
   - Uso: publicar frontend web y compartir URL pública.

2. **Expo (preview web / Expo tooling)**
   - Sitio: https://expo.dev/
   - Uso: flujo de desarrollo y pruebas web con Expo Router + React Native Web.

3. **BrowserStack Live** (prueba en navegadores y dispositivos reales)
   - Sitio: https://www.browserstack.com/live
   - Uso: validar cómo se ve/funciona en iPhone/Android y distintos navegadores sin tener todos los equipos.

4. **LambdaTest** (cross-browser testing)
   - Sitio: https://www.lambdatest.com/
   - Uso: ejecutar pruebas manuales visuales en múltiples navegadores/versiones.

5. **Ngrok** (para exponer tu entorno local y abrirlo desde otros equipos)
   - Sitio: https://ngrok.com/
   - Uso: compartir una URL pública temporal de tu frontend/backend local para pruebas externas.

6. **Render / Railway / Fly.io** (backend público para pruebas reales)
   - Render: https://render.com/
   - Railway: https://railway.app/
   - Fly.io: https://fly.io/
   - Uso: desplegar API y conectar `EXPO_PUBLIC_BACKEND_URL` a una URL real para validar login, registro, swipes y matches fuera de localhost.

> Recomendación práctica: publica frontend en **GitHub Pages** y backend en **Render/Railway/Fly.io**; después prueba la URL final en **BrowserStack** para verificar experiencia móvil completa.

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

