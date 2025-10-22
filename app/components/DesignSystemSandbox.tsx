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

// Import the bundled design system as raw text
// @ts-ignore - raw imports are handled by webpack configuration
import dsRaw from "../../ds/build-sandpack/index.mjs?raw";
// @ts-ignore
import dsCss from "../../ds/build-sandpack/index.css?raw";

// Pre-installed packages that are always available
// NAV Design System is now bundled locally and doesn't need to be downloaded
const DEFAULT_PACKAGES = {};

// Packages that cannot be removed (pre-installed)
// @navikt/ds is pre-bundled and always available
const LOCKED_PACKAGES = ["@navikt/ds"];

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
  VStack,
} from "@navikt/ds";
import "@navikt/ds/styles.css";

`;

// Default user code - no imports needed!
const DEFAULT_CODE = `export default function App() {
  return (
    <div style={{ padding: '20px' }}>
      <Heading size="large" spacing>Design System Sandbox</Heading>
      <BodyLong spacing>
        All NAV Design System components are pre-imported and ready to use!
      </BodyLong>
      <Button>Try me!</Button>
    </div>
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
    <div style={{ height: "100vh", width: "100vw" }}>
      <PanelGroup direction="vertical">
        <Panel defaultSize={50} minSize={20}>
          <SandpackPreview
            showOpenInCodeSandbox={false}
            showRefreshButton={true}
          />
        </Panel>

        <PanelResizeHandle className="h-2 bg-gray-200 hover:bg-blue-400 transition-colors cursor-row-resize" />

        <Panel defaultSize={50} minSize={20}>
          <SandpackCodeEditor
            showTabs={false}
            showLineNumbers={true}
            wrapContent={true}
            extensions={[autocompletion()]}
            extensionsKeymap={[...completionKeymap]}
          />
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
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for Package Management */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
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
          "/node_modules/@navikt/ds/styles.css": {
            hidden: true,
            code: dsCss,
          },
        }}
        customSetup={{
          dependencies: packages,
        }}
        options={{
          visibleFiles: ["/UserCode.js"],
          activeFile: "/UserCode.js",
          classes: {
            "sp-wrapper": "sandpack-wrapper-fill",
            "sp-layout": "sandpack-wrapper-fill",
          },
        }}
      >
        <SandboxContent onCodeChange={setCode} preamble={HIDDEN_PREAMBLE} />
      </SandpackProvider>
    </div>
  );
}
