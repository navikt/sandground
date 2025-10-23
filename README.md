# Sandground

A playground for experimenting with [NAV Design System (Aksel)](https://aksel.nav.no/) components using [Sandpack](https://sandpack.codesandbox.io/).

## Features

- 🎨 **Pre-bundled Design System** - All NAV Design System components are bundled locally for instant loading
- 🌙 **Dual Theme Support** - Switch between legacy CSS and new darkside CSS with dark mode support
- 📦 **Auto-imports** - React components are automatically imported, no boilerplate needed
- 🔒 **Pre-installed Packages** - `@navikt/ds-react`, `@navikt/ds-css`, and `@navikt/ds-tokens` are bundled and ready to use
- 🚀 **Live Sandbox** - Edit code in real-time with Sandpack's interactive editor
- 📋 **Package Manager** - Add additional npm packages on the fly

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sandground
```

2. Install dependencies:
```bash
npm install
```

3. **Build the design system bundle** (required before first run):
```bash
npm run build:ds
```

This will create the bundled design system files in `ds/build-sandpack/`:
- `index.mjs` - React components (~1.6MB)
- `light.css` - Light theme CSS (~234KB)
- `darkside.css` - Dark theme CSS (~194KB)

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) to see the sandbox

### Rebuilding the Design System

Whenever you update the design system packages, rebuild the bundle:

```bash
npm run build:ds
```

## Project Structure

```
sandground/
├── app/                      # Next.js app directory
│   ├── components/           # React components
│   │   ├── DesignSystemSandbox.tsx  # Main sandbox component
│   │   └── PackageManager.tsx       # NPM package manager UI
│   └── sandpack/            # Sandpack page route
├── ds/                      # Design system bundling
│   ├── index.ts            # React components entry
│   ├── light.ts            # Light theme CSS entry
│   ├── darkside.ts         # Dark theme CSS entry
│   └── build-sandpack/     # Built bundles (gitignored)
├── sandpack.config.ts      # Bundled packages configuration
├── tsup.config.js          # Bundle build configuration
└── LOCAL_DEPENDENCIES.md   # Documentation on bundling approach
```

## Configuration

### Adding More Pre-bundled Packages

See [LOCAL_DEPENDENCIES.md](./LOCAL_DEPENDENCIES.md) for detailed instructions on adding additional pre-bundled packages.

### Customizing the Sandbox

Edit `app/components/DesignSystemSandbox.tsx` to:
- Modify the default code template
- Add more auto-imported components to `HIDDEN_PREAMBLE`
- Customize the sandbox layout and UI

## Technology Stack

- **Next.js 16** - React framework
- **Sandpack** - Code sandbox environment
- **tsup** - TypeScript bundler for design system
- **NAV Design System (Aksel)** - Component library
- **Tailwind CSS** - Utility-first CSS framework

## Learn More

- [NAV Design System Documentation](https://aksel.nav.no/)
- [Sandpack Documentation](https://sandpack.codesandbox.io/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Local Dependencies Implementation](./LOCAL_DEPENDENCIES.md)

## License

[Your License Here]
