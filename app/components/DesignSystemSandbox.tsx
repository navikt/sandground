"use client";

import { useState } from "react";
import {
  SandpackProvider,
  SandpackPreview,
  SandpackCodeEditor,
} from "@codesandbox/sandpack-react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import PackageManager from "./PackageManager";

const DEFAULT_CODE = `import React from 'react';

export default function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Design System Sandbox</h1>
      <p>Add packages and start building!</p>
    </div>
  );
}`;

export default function DesignSystemSandbox() {
  const [packages, setPackages] = useState<Record<string, string>>({});

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
            Add packages and experiment
          </p>
        </div>
        <PackageManager
          packages={packages}
          onAddPackage={handleAddPackage}
          onRemovePackage={handleRemovePackage}
        />
      </div>

      {/* Main Content Area */}
      <SandpackProvider
        template="react"
        theme="light"
        files={{
          "/App.js": DEFAULT_CODE,
        }}
        customSetup={{
          dependencies: packages,
        }}
        options={{
          classes: {
            "sp-wrapper": "sandpack-wrapper-fill",
            "sp-layout": "sandpack-wrapper-fill",
          },
        }}
      >
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
              />
            </Panel>
          </PanelGroup>
        </div>
      </SandpackProvider>
    </div>
  );
}
