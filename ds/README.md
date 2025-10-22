# Design System Bundle

This directory contains the bundled NAV Design System that is pre-loaded into the Sandpack sandbox.

## How it works

1. `index.ts` re-exports all components from `@navikt/ds-react` and imports the CSS
2. `tsup` bundles these into a single file in `build-sandpack/`
3. The bundle is imported as raw text in the Next.js app using the `?raw` query parameter
4. The raw bundle is injected into Sandpack's virtual file system as a local dependency in `/node_modules/@navikt/ds/`

## Rebuilding the bundle

Run `npm run build:ds` to rebuild the bundle after updating dependencies or the design system version.

## Benefits

- **No download time**: The design system is bundled locally and doesn't need to be fetched from npm
- **Faster sandbox startup**: No network requests needed for the core design system
- **Offline support**: Works without internet connection
- **Version control**: The bundled version is consistent across all users
