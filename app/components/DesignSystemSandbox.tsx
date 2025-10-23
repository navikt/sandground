"use client";

import { useState, useEffect, useRef } from "react";
import {
  SandpackProvider,
  SandpackPreview,
  SandpackCodeEditor,
  useSandpack,
} from "@codesandbox/sandpack-react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { autocompletion, completionKeymap } from "@codemirror/autocomplete";
import PackageManager from "./PackageManager";
import { BUNDLED_PACKAGE_MAP } from "../../sandpack.config";

// Import the bundled design system as raw text
// @ts-ignore - raw imports are handled by webpack configuration
import dsRaw from "../../ds/build-sandpack/index.mjs?raw";
// @ts-ignore - Light theme CSS
import dsLightCss from "../../ds/build-sandpack/light.css?raw";
// @ts-ignore - Dark theme CSS
import dsDarksideCss from "../../ds/build-sandpack/darkside.css?raw";

// Pre-installed packages that are always available (derived from sandpack.config.ts)
// These are bundled locally and don't need to be downloaded from npm
const DEFAULT_PACKAGES = Object.fromEntries(
  Object.entries(BUNDLED_PACKAGE_MAP).map(([name, config]) => [
    name,
    config.version,
  ])
);

// Packages that cannot be removed (pre-installed)
const LOCKED_PACKAGES = Object.keys(BUNDLED_PACKAGE_MAP);

// Hidden preamble with all imports - automatically prepended to user code
const HIDDEN_PREAMBLE = `import React from 'react';
import {
  Accordion,
  Alert,
  BodyLong,
  BodyShort,
  Box,
  Button,
  Checkbox,
  Chat,
  Chips,
  Combobox,
  ConfirmationPanel,
  CopyButton,
  DatePicker,
  Detail,
  Dropdown,
  ErrorMessage,
  ErrorSummary,
  Fieldset,
  FileUpload,
  GuidePanel,
  Heading,
  HelpText,
  HGrid,
  HStack,
  Label,
  Link,
  List,
  Loader,
  Modal,
  MonthPicker,
  Page,
  Pagination,
  Panel,
  Popover,
  ProgressBar,
  Radio,
  ReadMore,
  Search,
  Select,
  Skeleton,
  Stepper,
  Switch,
  Table,
  Tabs,
  Tag,
  Textarea,
  TextField,
  Timeline,
  ToggleGroup,
  Tooltip,
  Theme,
  VStack,
} from "@navikt/ds";

`;

// Default user code - no imports needed!
// React components are already imported in the hidden preamble
// Users just need to choose their theme by uncommenting one CSS import
const DEFAULT_CODE = `// Choose your CSS (uncomment one):
// import "@navikt/ds-css";  // Legacy CSS
import "@navikt/ds-css/darkside";  // New CSS (with dark mode support)

// import { formatDistance, subDays } from "date-fns"

export default function App() {
  let datestr = ""
  // datestr = formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true })
  return (
    <Theme>
      <Page>
        <Page.Block width="xl" gutters>
          <VStack gap="8">
            <Heading size="large">Design System Sandbox {datestr}</Heading>

            <BodyLong>
              All NAV Design System components are pre-imported and ready to use!
              Toggle between legacy and new CSS by switching the import above.
            </BodyLong>

            {/* Light theme section */}
            <Panel border>
              <VStack gap="4">
                <Heading size="medium">Light Theme Section</Heading>
                <BodyShort>
                  This section uses the default light theme styling.
                </BodyShort>
                <HStack gap="4">
                  <Button variant="primary">Primary Button</Button>
                  <Button variant="secondary">Secondary</Button>
                </HStack>
                <Alert variant="info">
                  This is an info alert in the light theme!
                </Alert>
              </VStack>
            </Panel>

            {/* Dark theme section */}
            <Panel border className="dark">
              <VStack gap="4">
                <Heading size="medium">Dark Theme Section</Heading>
                <BodyShort>
                  This section uses the dark theme via .dark className.
                </BodyShort>
                <HStack gap="4">
                  <Button variant="primary">Primary Button</Button>
                  <Button variant="secondary">Secondary</Button>
                </HStack>
                <Alert variant="success">
                  This is a success alert in the dark theme!
                </Alert>
              </VStack>
            </Panel>
          </VStack>
        </Page.Block>
      </Page>
    </Theme>
  );
}`;

// Inner component that has access to Sandpack context
function SandboxContent({
  onCodeChange,
  preamble,
}: {
  onCodeChange: (code: string) => void;
  preamble: string;
}) {
  const { sandpack } = useSandpack();
  const previousUserCodeRef = useRef<string>("");

  useEffect(() => {
    const userCodeFile = "/UserCode.js";
    const appFile = "/App.js";
    const userCode = sandpack.files[userCodeFile]?.code;

    // Only update if the user code actually changed
    if (userCode && userCode !== previousUserCodeRef.current) {
      previousUserCodeRef.current = userCode;

      // Update the user code state
      onCodeChange(userCode);

      // Update the App.js file with preamble + user code for execution
      const compiledCode = preamble + userCode;
      const currentAppCode = sandpack.files[appFile]?.code;

      // Only update if the compiled code is different
      if (currentAppCode !== compiledCode) {
        sandpack.updateFile(appFile, compiledCode);
      }
    }
  }, [sandpack.files["/UserCode.js"]?.code, onCodeChange, preamble, sandpack]);

  return (
    <div style={{ height: "100vh", width: "100%", display: "flex", flexDirection: "column" }}>
      <PanelGroup direction="vertical" style={{ flex: "1 1 0", height: "100%" }}>
        <Panel defaultSize={50} minSize={20}>
          <div className="sandpack-panel-wrapper" style={{ height: "100%", width: "100%" }}>
            <SandpackPreview
              showOpenInCodeSandbox={false}
              showRefreshButton={true}
            />
          </div>
        </Panel>

        <PanelResizeHandle className="h-2 bg-gray-200 hover:bg-blue-400 transition-colors cursor-row-resize" />

        <Panel defaultSize={50} minSize={20}>
          <div className="sandpack-panel-wrapper" style={{ height: "100%", width: "100%" }}>
            <SandpackCodeEditor
              showTabs={false}
              showLineNumbers={true}
              wrapContent={true}
              extensions={[autocompletion()]}
              extensionsKeymap={[...completionKeymap]}
            />
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}

export default function DesignSystemSandbox() {
  const [packages, setPackages] =
    useState<Record<string, string>>(DEFAULT_PACKAGES);
  const [code, setCode] = useState<string>(DEFAULT_CODE);

  const handleAddPackage = (packageName: string, version: string) => {
    setPackages((prev) => ({
      ...prev,
      [packageName]: version,
    }));
  };

  const handleRemovePackage = (packageName: string) => {
    setPackages((prev) => {
      const newPackages = { ...prev };
      delete newPackages[packageName];
      return newPackages;
    });
  };

  return (
    <div className="design-system-sandbox-root flex h-screen bg-gray-50">
      {/* Sidebar for Package Management */}
      <div className="design-system-sidebar w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="sidebar-header p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Design System Sandbox
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            NAV Design System is pre-installed
          </p>
          <p className="text-xs text-blue-600 mt-2 bg-blue-50 p-2 rounded">
            💡 All components are auto-imported - no need to write import
            statements!
          </p>
        </div>
        <PackageManager
          packages={packages}
          onAddPackage={handleAddPackage}
          onRemovePackage={handleRemovePackage}
          lockedPackages={LOCKED_PACKAGES}
        />
      </div>

      {/* Main Content Area */}
      <SandpackProvider
        template="react"
        theme="light"
        files={{
          // The actual file that gets executed - includes preamble + user code
          "/App.js": {
            code: HIDDEN_PREAMBLE + code,
          },
          // Virtual file for the editor to show only user code
          "/UserCode.js": {
            code: code,
            active: true,
          },
          // Add the pre-bundled NAV Design System as a local dependency
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
          // Add @navikt/ds-css package for both light and dark themes
          "/node_modules/@navikt/ds-css/package.json": {
            hidden: true,
            code: JSON.stringify({
              name: "@navikt/ds-css",
              main: "./index.js",
              exports: {
                ".": "./index.js",
                "./darkside": "./darkside.js",
              },
            }),
          },
          "/node_modules/@navikt/ds-css/index.js": {
            hidden: true,
            code: `import './index.css';\nexport {};`,
          },
          "/node_modules/@navikt/ds-css/index.css": {
            hidden: true,
            code: dsLightCss,
          },
          "/node_modules/@navikt/ds-css/darkside.js": {
            hidden: true,
            code: `import './darkside.css';\nexport {};`,
          },
          "/node_modules/@navikt/ds-css/darkside.css": {
            hidden: true,
            code: dsDarksideCss,
          },
        }}
        customSetup={{
          // Only include packages that are NOT pre-bundled
          // Pre-bundled packages are already in /node_modules via files above
          dependencies: Object.fromEntries(
            Object.entries(packages).filter(
              ([name]) => !LOCKED_PACKAGES.includes(name)
            )
          ),
        }}
        options={{
          visibleFiles: ["/UserCode.js"],
          activeFile: "/UserCode.js",
          classes: {
            "sp-wrapper": "sandpack-wrapper-fill sandpack-main-wrapper",
            "sp-layout": "sandpack-wrapper-fill sandpack-layout-container",
            "sp-stack": "sandpack-stack",
            "sp-preview-container": "sandpack-preview-container",
            "sp-preview-iframe": "sandpack-preview-iframe",
            "sp-code-editor": "sandpack-code-editor",
          },
        }}
      >
        <SandboxContent onCodeChange={setCode} preamble={HIDDEN_PREAMBLE} />
      </SandpackProvider>
    </div>
  );
}
