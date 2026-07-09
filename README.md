# Bundle Builder — Wyze-style Security System Configurator

view Demo: https://bundle-builder-gamma.vercel.app/

A multi-step, data-driven bundle builder built with React + Vite. Shoppers walk through
four steps (Cameras → Plan → Sensors → Accessories) and see a live order summary update
as they go.

## Getting started

```bash
git clone <this-repo-url>
cd bundle-builder
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default (Vite will print the exact URL in your
terminal).

To build a production bundle:

```bash
npm run build
npm run preview   # serve the production build locally to sanity-check it
```

## Project structure

src/
├── components/
│ ├── Accordion/ => Collapsible step headers (4-step builder)
│ ├── BundleBuilder/ => Renders the 4 steps + product grids from JSON
│ ├── ProductCard/ => Individual product card (badge, variants, stepper, price)
│ ├── VariantSelector/ => Color/variant chip selector, one active variant per card
│ ├── ReviewPanel/ => Live order summary on the right
│ └── ReviewItem/ => One line item inside the review panel
├── context/
│ ├── BundleContext.jsx => React Context that shares bundle state app-wide
│ └── useBundleContext.jsx => Hook to consume that context
├── hooks/
│ └── useBundle.js => Single source of truth: quantities, increment/decrement,
│ localStorage persistence
├── data/
│ ├── products.json => All product data (cameras, plans, sensors, accessories)
│ └── steps.json => The 4 builder steps (title, icon, category mapping)
├── pages/
│ └── Home.jsx => Two-column layout: BundleBuilder + ReviewPanel

## How state is managed

Every product/variant quantity lives in **one place**: the `useBundle` hook, exposed to
the whole component tree through `BundleContext`. This was a deliberate choice over prop
drilling — `ProductCard` and `ReviewPanel` are several component levels apart, and passing
quantity state down manually through every intermediate component would have been fragile
and repetitive.

Quantities are keyed as `` `${productId}-${variantId}` ``, so each color/variant of a
product is tracked independently — incrementing "Red" never touches "Blue"'s count, and
both show up as separate lines in the review panel once their quantity is above zero.

## Persistence ("Save my system for later")

Clicking **Save my system for later** writes the current quantities object to
`localStorage` under the key `bundle-builder:quantities`. On page load, the app checks
`localStorage` first and falls back to the default quantities from `products.json` only if
nothing is saved yet (or if the saved data is corrupted, in which case it fails
gracefully instead of crashing).

## Decisions & trade-offs

- **"As low as $X/mo" financing estimate** is a simple approximation
  (`subtotal ÷ 12 + monthly plan cost`), not a real financing/APR calculation. There was no
  spec for the actual formula, so this is a placeholder that gives a visually similar
  result to the reference design rather than a financially accurate figure.
- **No backend.** Product data is served from a local `products.json` file, per the
  assignment's note that this is acceptable and a backend is a bonus, not a requirement.
- **Checkout button** is a visual placeholder only — it's disabled when the cart is empty,
  but does not lead anywhere, per the assignment's instructions.
- **Products without color options** (e.g. items with a single variant) don't render the
  variant selector at all, per the original spec.
- **Required/bundled items** (e.g. a hub that's always included) use a `disabled: true`
  flag in `products.json`, which disables their stepper buttons and forces their price to
  display as "FREE" regardless of the listed price.

## What isn't finished / known limitations

- The "as low as" financing figure is an estimate, as noted above — swap in a real formula
  if one is provided.
- No automated tests were added given the scope and timeline of this assignment.
- Minor ESLint warning (`react-refresh/only-export-components`) on `BundleContext.jsx`
  because it exports both a context object and a component from the same file. Functionally
  harmless; left as-is to avoid unnecessary churn this late in the build.
