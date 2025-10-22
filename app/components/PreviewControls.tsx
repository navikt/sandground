"use client";

interface PreviewControlsProps {
  width: number;
  onWidthChange: (width: number) => void;
}

const PRESETS = [
  { name: "Mobile", width: 375, icon: "📱" },
  { name: "Tablet", width: 768, icon: "📱" },
  { name: "Desktop", width: 1440, icon: "🖥️" },
  { name: "Wide", width: 1920, icon: "🖥️" },
];

export default function PreviewControls({
  width,
  onWidthChange,
}: PreviewControlsProps) {
  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="p-4 space-y-3">
        {/* Preset Buttons */}
        <div className="flex gap-2 flex-wrap">
          {PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => onWidthChange(preset.width)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                width === preset.width
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className="mr-1">{preset.icon}</span>
              {preset.name}
            </button>
          ))}
        </div>

        {/* Width Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              Custom Width
            </label>
            <span className="text-sm text-gray-600 font-mono">{width}px</span>
          </div>
          <input
            type="range"
            min="320"
            max="2560"
            step="10"
            value={width}
            onChange={(e) => onWidthChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>320px</span>
            <span>2560px</span>
          </div>
        </div>
      </div>
    </div>
  );
}
