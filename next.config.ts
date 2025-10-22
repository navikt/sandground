import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  webpack: (config) => {
    // Add support for importing files with ?raw query parameter
    // This allows importing bundled files as text for Sandpack
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
  },
};

export default nextConfig;
