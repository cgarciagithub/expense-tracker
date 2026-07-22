---
name: testing-expense-tracker
description: Test the Mis Gastos expense tracker end-to-end via the UI. Use when verifying add/edit/delete of expenses, Diario/Semanal/Mensual period filtering, summary totals/averages, charts, or localStorage persistence.
---

# Testing — Mis Gastos (expense tracker)

Static React + Vite app, no backend/DB. State lives entirely in `localStorage` under key `expense-tracker:expenses`. No login/auth required.

## Run it
- `npm install` then `npm run dev` → serves at `http://localhost:5173/`.
- Checks: `npm run test` (Vitest), `npm run lint` (ESLint), `npm run build`.
- Node 20.19+ / 22.12+ recommended (Vite 7). Older Node may warn but still builds.

## Clean state before a run (setup, not part of the demo)
The app has no "clear all" button, so reset storage before testing:
```js
localStorage.removeItem('expense-tracker:expenses'); location.reload();
```
Do this during setup (before recording). During the recorded flow, use only native UI clicks (avoid devtools).

## UI layout
- Left: `Nuevo gasto` form — Importe (accepts comma decimals e.g. `12,50`), Fecha (native date input, US mm/dd/yyyy display), Descripción, Categoría (`<select>`), submit `Añadir gasto` / in edit mode `Guardar cambios` + `Cancelar`.
- Top-right: period tabs `Diario` / `Semanal` / `Mensual`.
- Right: SummaryCards (Total gastado / Nº de gastos / Gasto medio = total/nº), bar chart (Gastos de la semana / por día), pie chart (Por categoría), and `Movimientos` list.
- List rows expose `aria-label="Editar <desc>"` and `aria-label="Eliminar <desc>"` buttons — reliable selectors.

## Period semantics (from src/utils/dates.ts)
- `day` = same calendar day as today; `week` = Monday–Sunday of the current week; `month` = same year+month.
- Dates stored as local `YYYY-MM-DD` (no UTC off-by-one).

## Adversarial E2E flow that distinguishes working vs broken
1. Add an expense today → total/nº/media/bar/pie/list all update.
2. Add a second expense today with a different amount → verify media = total/nº (not a fixed value).
3. Add a third expense dated **earlier in the same month but a different week** → it must be ABSENT in Diario and Semanal but PRESENT in Mensual (proves filtering, not just rendering).
4. Edit an expense in place → same row updates, nº unchanged.
5. Delete an expense → row gone, summaries update.
6. Reload (F5) → all data persists (localStorage).

## Tips / gotchas
- The native date input: click the field and type digits `MMDDYYYY` to set a date reliably.
- The category `<select>` needs a click to open, then click the option.
- Pie/bar are Recharts SVGs; assert values from the legend/list text rather than pixels.

## Devin Secrets Needed
None. Fully local, no credentials or external services.
