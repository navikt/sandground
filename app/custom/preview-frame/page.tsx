"use client";

import { useEffect, useState } from "react";
import * as NavDS from "@navikt/ds-react";
import "@navikt/ds-css";

export default function PreviewFrame() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // For production, validate event.origin
      if (event.data.type === "EXECUTE_CODE") {
        try {
          setError(null);
          const { code } = event.data;

          // Clear the root
          const root = document.getElementById("preview-root");
          if (!root) return;

          // Create a function that executes the user's code
          // Make React, NavDS components available in scope
          const execute = new Function(
            "React",
            "NavDS",
            ...Object.keys(NavDS),
            `
            const { useState, useEffect, useCallback, useMemo, useRef } = React;
            ${code}
            return App;
            `
          );

          // Execute and get the App component
          const App = execute(
            { default: require("react"), ...require("react") },
            NavDS,
            ...Object.values(NavDS)
          );

          // Render the component
          const React = require("react");
          const ReactDOM = require("react-dom/client");

          // Clear and create new root
          root.innerHTML = "";
          const reactRoot = ReactDOM.createRoot(root);
          reactRoot.render(<App />);
        } catch (err: any) {
          console.error("Execution error:", err);
          setError(err.message);

          // Send error back to parent
          window.parent.postMessage(
            {
              type: "EXECUTION_ERROR",
              error: err.message,
              stack: err.stack,
            },
            "*"
          );
        }
      }
    };

    window.addEventListener("message", handleMessage);

    // Signal ready
    window.parent.postMessage({ type: "FRAME_READY" }, "*");

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", overflow: "auto" }}>
      {error && (
        <div
          style={{
            padding: "20px",
            background: "#fee",
            color: "#c00",
            fontFamily: "monospace",
            whiteSpace: "pre-wrap",
          }}
        >
          <strong>Error:</strong>
          <br />
          {error}
        </div>
      )}
      <div id="preview-root" />
    </div>
  );
}
