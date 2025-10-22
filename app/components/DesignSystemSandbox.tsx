"use client";

import {
  SandpackProvider,
  SandpackPreview,
  SandpackCodeEditor,
} from "@codesandbox/sandpack-react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

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
  return (
    <SandpackProvider
      template="react"
      theme="light"
      files={{
        "/App.js": DEFAULT_CODE,
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
  );
}
