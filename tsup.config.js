import { defineConfig } from "tsup";
import { BUNDLED_PACKAGES } from "./sandpack.config.ts";

export default defineConfig([
  // React components bundle (no CSS)
  {
    entry: ["./ds/index.ts"],
    treeshake: true,
    minify: true,
    verbose: true,
    dts: true,
    tsconfig: "./tsup.tsconfig.json",
    // Keep React and ReactDOM external as they're provided by Sandpack
    // But bundle @navikt packages
    external: ["react", "react-dom"],
    noExternal: BUNDLED_PACKAGES,
    clean: true,
    outDir: "./ds/build-sandpack",
    format: ["esm"],
  },
  // Light theme CSS bundle (separate)
  {
    entry: ["./ds/light.ts"],
    treeshake: true,
    minify: true,
    verbose: true,
    dts: false, // No need for types for CSS-only bundle
    tsconfig: "./tsup.tsconfig.json",
    external: ["react", "react-dom"],
    noExternal: BUNDLED_PACKAGES,
    clean: false, // Don't clean, we want all bundles
    outDir: "./ds/build-sandpack",
    format: ["esm"],
  },
  // Darkside theme CSS bundle (separate)
  {
    entry: ["./ds/darkside.ts"],
    treeshake: true,
    minify: true,
    verbose: true,
    dts: false, // No need for types for CSS-only bundle
    tsconfig: "./tsup.tsconfig.json",
    external: ["react", "react-dom"],
    noExternal: BUNDLED_PACKAGES,
    clean: false, // Don't clean, we want all bundles
    outDir: "./ds/build-sandpack",
    format: ["esm"],
  },
]);
