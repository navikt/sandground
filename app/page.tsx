import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Design System Sandbox
          </h1>
          <p className="text-xl text-gray-600">
            Experiment with NAV Design System components in two different ways
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Sandpack Option */}
          <Link href="/sandpack" className="group">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-blue-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Sandpack Sandbox
                </h2>
              </div>

              <p className="text-gray-600 mb-6">
                Full-featured sandbox powered by CodeSandbox with npm package
                support
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-600">✓</span>
                  <span className="text-gray-700">Add any npm package</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-600">✓</span>
                  <span className="text-gray-700">Advanced code editor</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-orange-600">⚠</span>
                  <span className="text-gray-700">~10s initial load time</span>
                </div>
              </div>

              <div className="flex items-center text-blue-600 font-medium group-hover:gap-3 transition-all">
                Open Sandpack
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>

          {/* Custom Option */}
          <Link href="/custom" className="group">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-green-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Custom Sandbox
                </h2>
              </div>

              <p className="text-gray-600 mb-6">
                Lightning-fast sandbox with pre-installed NAV Design System
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-600">✓</span>
                  <span className="text-gray-700">Instant loading</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-600">✓</span>
                  <span className="text-gray-700">Pre-installed packages</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-orange-600">⚠</span>
                  <span className="text-gray-700">Fixed package set</span>
                </div>
              </div>

              <div className="flex items-center text-green-600 font-medium group-hover:gap-3 transition-all">
                Open Custom
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 text-sm">
            Built with Next.js, React, and NAV Design System
          </p>
        </div>
      </div>
    </div>
  );
}
