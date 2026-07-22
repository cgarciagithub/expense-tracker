# Mis Gastos

Aplicación web minimalista para llevar el registro de gastos **diarios, semanales y mensuales**. Funciona **100% en el navegador**, sin base de datos ni backend: los datos se guardan en el `localStorage` de tu equipo.

## Características

- Añadir, editar y eliminar gastos (importe, descripción, categoría y fecha).
- 8 categorías con colores (Comida, Transporte, Hogar, Ocio, Salud, Compras, Servicios, Otros).
- Vistas **Diario / Semanal / Mensual** con:
  - Totales del periodo (total, nº de gastos y gasto medio).
  - Gráfico de barras por día del periodo.
  - Gráfico de tarta por categoría.
- Persistencia automática en `localStorage` (sin servidor).
- Interfaz limpia y responsive.

## Stack

- [Vite](https://vite.dev/) + [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) para los estilos
- [Recharts](https://recharts.org/) para los gráficos
- [Vitest](https://vitest.dev/) para los tests
- `localStorage` como almacenamiento

## Requisitos

- Node.js 20.19+ o 22.12+ (recomendado por Vite 7)

## Desarrollo

```bash
npm install      # instalar dependencias
npm run dev      # arrancar servidor de desarrollo
npm run build    # compilar para producción (typecheck + build)
npm run preview  # previsualizar el build de producción
npm run test     # ejecutar los tests
npm run lint     # ejecutar el linter
```

## Despliegue

Al ser una app estática, se puede desplegar gratis en Vercel, Netlify, Cloudflare Pages o GitHub Pages. Basta con publicar el contenido de la carpeta `dist/` generada por `npm run build`.
