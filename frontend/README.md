# COSMO-DATE Frontend (Web/PWA)

Este frontend está configurado para ejecutarse como **aplicación web (PWA)** usando Expo + React Native Web.

## Requisitos

- Node.js 18+
- npm 9+

## Ejecución local

1. Instala dependencias:

   ```bash
   npm install
   ```

2. Inicia el servidor en modo web:

   ```bash
   npm run start
   ```

3. Abre la URL mostrada por Expo en tu navegador.

## Extensiones soportadas (resolución web-first)

Metro está configurado para priorizar archivos específicos para web en este orden:

1. `*.web.tsx`
2. `*.web.ts`
3. `*.web.jsx`
4. `*.web.js`
5. resto de extensiones por defecto de Expo/Metro

Esto permite mantener implementaciones específicas para navegador sin romper el flujo compartido.

## Scripts disponibles

- `npm run start` → inicia Expo en modo web.
- `npm run web` → alias de `start`.
- `npm run lint` → validación de código.

## Nota

La configuración del repositorio prioriza web; no se mantiene flujo activo para `ios`/`android` en scripts.
