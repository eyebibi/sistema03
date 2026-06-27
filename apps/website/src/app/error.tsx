"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-base-100 text-base-content">
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-3xl">
          <div className="bg-white/3 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              An error occurred
            </h1>
            <p className="text-gray-300 mb-6">
              Sorry, something unexpected happened. You can try again
              or go back to the home page.
            </p>

            <div className="text-left mb-6">
              <label className="text-sm text-gray-400 block mb-2">
                Details
              </label>
              <pre className="bg-white/5 p-4 rounded-md text-sm text-gray-200 overflow-auto max-h-44">
                {error?.message ?? String(error)}
              </pre>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button onClick={() => reset()} className="btn btn-primary">
                Try again
              </button>
              <Link href="/" className="btn btn-outline">
                Go to home
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
