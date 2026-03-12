"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
          <h2 className="text-lg font-semibold text-black">应用出错了</h2>
          <p className="text-sm text-gray-600">{error.message}</p>
          <button
            type="button"
            onClick={reset}
            className="rounded-md bg-black px-4 py-2 text-sm text-white hover:bg-gray-800"
          >
            重试
          </button>
        </div>
      </body>
    </html>
  );
}
