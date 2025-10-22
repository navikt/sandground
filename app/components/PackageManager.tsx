"use client";

import { useState } from "react";

interface PackageManagerProps {
  packages: Record<string, string>;
  onAddPackage: (packageName: string, version: string) => void;
  onRemovePackage: (packageName: string) => void;
}

export default function PackageManager({
  packages,
  onAddPackage,
  onRemovePackage,
}: PackageManagerProps) {
  const [packageInput, setPackageInput] = useState("");
  const [versionInput, setVersionInput] = useState("latest");
  const [isAdding, setIsAdding] = useState(false);

  const handleAddPackage = async () => {
    if (!packageInput.trim()) return;

    setIsAdding(true);
    try {
      // Validate package exists (optional - could add npm registry check)
      onAddPackage(packageInput.trim(), versionInput.trim());
      setPackageInput("");
      setVersionInput("latest");
    } catch (error) {
      console.error("Error adding package:", error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddPackage();
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Add Package Form */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Add NPM Package
        </label>
        <div className="space-y-2">
          <input
            type="text"
            value={packageInput}
            onChange={(e) => setPackageInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., @mui/material"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isAdding}
          />
          <div className="flex gap-2">
            <input
              type="text"
              value={versionInput}
              onChange={(e) => setVersionInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Version"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isAdding}
            />
            <button
              onClick={handleAddPackage}
              disabled={isAdding || !packageInput.trim()}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {isAdding ? "Adding..." : "Add"}
            </button>
          </div>
        </div>
      </div>

      {/* Installed Packages List */}
      <div className="flex-1 overflow-auto p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Installed Packages ({Object.keys(packages).length})
        </h3>
        {Object.keys(packages).length === 0 ? (
          <div className="text-sm text-gray-500 italic text-center py-8">
            No packages installed yet
          </div>
        ) : (
          <div className="space-y-2">
            {Object.entries(packages).map(([name, version]) => (
              <div
                key={name}
                className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {name}
                  </div>
                  <div className="text-xs text-gray-500">v{version}</div>
                </div>
                <button
                  onClick={() => onRemovePackage(name)}
                  className="ml-2 p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                  title="Remove package"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
