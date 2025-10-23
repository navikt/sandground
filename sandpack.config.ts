/**
 * Configuration for Sandpack bundled packages
 * This file defines which packages are pre-bundled and available in the sandbox
 * without needing to download from npm.
 */

// Packages that are pre-bundled for Sandpack
// These will be available in the sandbox without downloading from npm
export const BUNDLED_PACKAGES = [
  "@navikt/ds-react",
  "@navikt/ds-css",
  "@navikt/ds-tokens",
] as const;

// Map bundled packages to their virtual names in Sandpack
// This determines how users import them in the sandbox
export const BUNDLED_PACKAGE_MAP = {
  "@navikt/ds-react": {
    displayName: "@navikt/ds-react",
    version: "bundled",
    // React components bundle
    includes: ["@navikt/ds-react"],
  },
  "@navikt/ds-css": {
    displayName: "@navikt/ds-css",
    version: "bundled",
    // Available CSS themes:
    // - "@navikt/ds-css" (light theme - default export)
    // - "@navikt/ds-css/darkside" (dark theme)
    includes: ["@navikt/ds-css"],
  },
  "@navikt/ds-tokens": {
    displayName: "@navikt/ds-tokens",
    version: "bundled",
    // Design tokens bundle
    includes: ["@navikt/ds-tokens"],
  },
} as const;
