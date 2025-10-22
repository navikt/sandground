import { defineConfig } from "tsup";

export default defineConfig([
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
    noExternal: ["@navikt/ds-react", "@navikt/ds-css", "@navikt/ds-tokens"],
    clean: true,
    outDir: "./ds/build-sandpack",
    format: ["esm"],
  },
]);
