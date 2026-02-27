# Estado actual de la interfaz (Cosmo Date)

## Flujo principal

1. **Bienvenida (`/`)**
   - Pantalla inicial con branding del proyecto y accesos a iniciar sesión / registro.
2. **Login (`/login`)**
   - Formulario de acceso por correo y contraseña.
3. **Registro (`/register`)**
   - Formulario de alta de usuario con datos personales, foto y aceptación de términos.
4. **App principal (Tabs)**
   - Una vez autenticado, la navegación inferior muestra:
     - **Descubrir**
     - **Matches**
     - **Citas**
     - **Soporte**
     - **Perfil**

## Pantallas en tabs

- **Discover (`app/(tabs)/index.tsx`)**
  - Tarjetas y contenido para explorar posibles conexiones.
- **Matches (`app/(tabs)/matches.tsx`)**
  - Vista de coincidencias realizadas.
- **Dates (`app/(tabs)/dates.tsx`)**
  - Sección para revisar/agendar citas.
- **Support (`app/(tabs)/support.tsx`)**
  - Centro de ayuda y soporte.
- **Profile (`app/(tabs)/profile.tsx`)**
  - Gestión del perfil del usuario (incluye foto/edición y opciones de cuenta).

## Estilo visual general

- Tema oscuro predominante.
- Uso de gradientes y componentes visuales de Expo (`LinearGradient`, iconografía `Ionicons`).
- Enfoque móvil-first con navegación por tabs.

## Nota de ejecución en este entorno

No se pudo levantar la app web en este entorno por restricciones de red/proxy al arrancar Expo (`fetch failed` en dependencia de validación remota), por lo que no hay captura de pantalla automática en esta corrida.
