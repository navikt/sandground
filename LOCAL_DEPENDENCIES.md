# Local Dependencies Implementation

This document explains how local dependencies are implemented in the Sandpack sandbox following the pattern from the [Sandpack documentation](https://sandpack.codesandbox.io/docs/guides/local-dependencies).

## Architecture

### 1. Bundle Creation (`ds/` directory)
- **`ds/index.ts`**: Entry point that re-exports all NAV Design System components
- **`ds/build-sandpack/`**: Output directory for the bundled files (gitignored)
- **`tsup.config.js`**: Configuration for bundling with tsup

### 2. Build Process
The design system is bundled using `tsup` with the following configuration:
- React and ReactDOM are marked as external (provided by Sandpack)
- NAV Design System packages are bundled using `noExternal`
- Output format: ESM
- Includes TypeScript declarations
- Minified for optimal size

### 3. Webpack Configuration
`next.config.ts` includes a custom webpack rule to support `?raw` imports:
```typescript
webpack: (config) => {
  for (const [index, rule] of config.module.rules.entries()) {
    if (!rule.test && rule.oneOf) {
      config.module.rules[index].oneOf = [
        {
          resourceQuery: /raw/,
          type: "asset/source",
        },
      ].concat(config.module.rules[index].oneOf);
    }
  }
  return config;
}
```

This allows importing files as raw text strings using the `?raw` query parameter.

### 4. Sandpack Integration
In `DesignSystemSandbox.tsx`:

1. **Import the bundle as raw text**:
   ```typescript
   import dsRaw from "../../ds/build-sandpack/index.mjs?raw";
   import dsCss from "../../ds/build-sandpack/index.css?raw";
   ```

2. **Inject into Sandpack's virtual file system**:
   ```typescript
   files={{
     "/node_modules/@navikt/ds/package.json": {
       hidden: true,
       code: JSON.stringify({
         name: "@navikt/ds",
         main: "./index.js",
       }),
     },
     "/node_modules/@navikt/ds/index.js": {
       hidden: true,
       code: dsRaw,
     },
     "/node_modules/@navikt/ds/styles.css": {
       hidden: true,
       code: dsCss,
     },
   }}
   ```

3. **Usage in sandbox**:
   ```typescript
   import { Button, Heading } from "@navikt/ds";
   import "@navikt/ds/styles.css";
   ```

## Benefits

1. **No Download Required**: The design system is pre-bundled and loaded instantly
2. **Faster Startup**: No npm resolution or CDN fetching
3. **Offline Support**: Works without internet connection
4. **Consistent Experience**: Same version for all users
5. **Reduced Network Load**: ~1.6MB bundle loaded once vs. multiple package downloads

## Maintenance

### Updating the Design System

1. Update the package version in `package.json`:
   ```bash
   npm install @navikt/ds-react@latest @navikt/ds-css@latest
   ```

2. Rebuild the bundle:
   ```bash
   npm run build:ds
   ```

3. Restart the dev server to pick up the new bundle

### Adding More Pre-bundled Packages

1. Add the package to `ds/index.ts`:
   ```typescript
   export * from "new-package";
   ```

2. Add to `noExternal` in `tsup.config.js`:
   ```javascript
   noExternal: ["@navikt/ds-react", "new-package"]
   ```

3. Rebuild with `npm run build:ds`

## Files Changed

- ✅ `ds/index.ts` - Bundle entry point
- ✅ `ds/README.md` - Documentation
- ✅ `tsup.config.js` - Build configuration
- ✅ `tsup.tsconfig.json` - TypeScript config for bundling
- ✅ `next.config.ts` - Webpack config for raw imports
- ✅ `app/components/DesignSystemSandbox.tsx` - Sandpack integration
- ✅ `package.json` - Added `build:ds` script and tsup dependency
- ✅ `.gitignore` - Ignore build output

## References

- [Sandpack Local Dependencies Guide](https://sandpack.codesandbox.io/docs/guides/local-dependencies)
- [Example Repository](https://github.com/codesandbox/sandpack-local-dependencies)
- [tsup Documentation](https://tsup.egoist.dev/)
