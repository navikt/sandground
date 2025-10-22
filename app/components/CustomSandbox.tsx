"use client";

import { useState, useRef, useEffect } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

const DEFAULT_CODE = `import React from 'react';
import {
  Heading,
  BodyLong,
  Button,
  Alert,
  Box,
  HStack,
  VStack,
} from "@navikt/ds-react";

export default function App() {
  const [count, setCount] = React.useState(0);

  return (
    <Box padding="8" style={{ height: '100%' }}>
      <VStack gap="4">
        <Heading size="large">Custom Sandbox</Heading>
        <BodyLong>
          All NAV Design System components are instantly available!
          No download wait time.
        </BodyLong>

        <Alert variant="info">
          Click the button below to test interactivity
        </Alert>

        <HStack gap="4">
          <Button onClick={() => setCount(count + 1)}>
            Clicked {count} times
          </Button>
          <Button variant="secondary" onClick={() => setCount(0)}>
            Reset
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}`;

export default function CustomSandbox() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [isReady, setIsReady] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "FRAME_READY") {
        setIsReady(true);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    if (isReady && iframeRef.current) {
      // Debounce execution
      const timer = setTimeout(() => {
        iframeRef.current?.contentWindow?.postMessage(
          {
            type: "EXECUTE_CODE",
            code: code,
          },
          "*"
        );
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [code, isReady]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Custom Sandbox
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Instant loading with pre-installed packages
          </p>
        </div>

        <div className="p-4 flex-1 overflow-auto">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Features
              </h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Instant loading (no npm downloads)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>NAV Design System pre-installed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Hot reload on code changes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600">⚠</span>
                  <span>Cannot add arbitrary npm packages</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Pre-installed
              </h3>
              <div className="space-y-2">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-sm font-medium text-gray-900">
                    @navikt/ds-react
                  </div>
                  <div className="text-xs text-gray-500">All components</div>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-sm font-medium text-gray-900">
                    @navikt/ds-css
                  </div>
                  <div className="text-xs text-gray-500">Styles</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="text-xs text-gray-500">
                Status:{" "}
                <span
                  className={
                    isReady ? "text-green-600 font-medium" : "text-orange-600"
                  }
                >
                  {isReady ? "Ready" : "Loading..."}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <PanelGroup direction="vertical">
          <Panel defaultSize={50} minSize={20}>
            <div className="h-full bg-white border-b border-gray-200 relative">
              {!isReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                  <div className="text-gray-600">Loading preview...</div>
                </div>
              )}
              <iframe
                ref={iframeRef}
                src="/custom/preview-frame"
                className="w-full h-full border-0"
                title="Preview"
              />
            </div>
          </Panel>

          <PanelResizeHandle className="h-2 bg-gray-200 hover:bg-blue-400 transition-colors cursor-row-resize" />

          <Panel defaultSize={50} minSize={20}>
            <CodeMirror
              value={code}
              height="100%"
              extensions={[javascript({ jsx: true, typescript: false })]}
              onChange={(value: string) => setCode(value)}
              theme="light"
              basicSetup={{
                lineNumbers: true,
                highlightActiveLineGutter: true,
                highlightActiveLine: true,
                foldGutter: true,
              }}
            />
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}
