# COSMO-DATE Frontend (Web/PWA)

Este frontend está configurado para ejecutarse como **aplicación web (PWA)** usando Expo + React Native Web.

## ¿Es HTML?

Sí, se ejecuta en el navegador y termina renderizando en HTML/CSS/JS.

- El código fuente está en React Native/Expo (`.tsx`, `.ts`).
- Metro + React Native Web lo adaptan para web.
- Para web, puedes crear variantes como `Componente.web.tsx`.

> No es una app nativa Android/iOS en este repositorio; el flujo principal es web/PWA.

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

## Resolución de archivos por plataforma

Expo/Metro ya maneja la resolución por plataforma automáticamente. Ejemplo recomendado:

- `Card.tsx` (base)
- `Card.web.tsx` (solo web)
- `Card.native.tsx` (solo nativo, si existiera)

No se fuerza una lista manual de extensiones web en Metro, para evitar configuraciones inválidas.

## Scripts disponibles

- `npm run start` → inicia Expo en modo web.
- `npm run web` → alias de `start`.
- `npm run lint` → validación de código.
