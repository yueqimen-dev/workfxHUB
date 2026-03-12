"use client";

import Link from "next/link";

export function LeftSidebar() {
  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-gray-200 bg-gray-100">
      {/* WorkfxHUB 入口 */}
      <Link
        href="/"
        className="flex items-center gap-3 border-b border-gray-200 p-4 hover:bg-gray-200/50 transition-colors"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-black text-white font-bold text-sm">
          W
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-display text-base font-bold text-black truncate">
            WorkfxHUB
          </p>
          <p className="text-xs text-gray-500 truncate">workfxhub.com</p>
        </div>
        <button
          type="button"
          className="shrink-0 rounded p-1 text-gray-400 hover:bg-gray-300 hover:text-gray-600"
          aria-label="收起侧边栏"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 15l5 5 5-5M7 9l5-5 5 5" />
          </svg>
        </button>
      </Link>

      {/* Status Cards */}
      <div className="flex gap-2 p-4">
        {["TOTAL", "FIXED", "PENDING"].map((label) => (
          <div
            key={label}
            className="flex flex-1 flex-col items-center rounded-lg border border-gray-200 bg-white px-2 py-3"
          >
            <span className="text-lg font-bold text-success">0</span>
            <span className="text-xs text-gray-500">{label}</span>
          </div>
        ))}
      </div>

      {/* WorkfxHUB 栏目 */}
      <div className="flex-1 p-4">
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-3">
          <span className="text-sm font-semibold text-black">WorkfxHUB</span>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 p-4 space-y-4">
        <div className="flex items-center gap-2">
          <svg className="h-4 w-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
          <span className="text-sm font-medium text-gray-600">Explore</span>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-black">Free</span>
            <button
              type="button"
              className="rounded bg-gray-200 px-2 py-1 text-xs font-medium text-black hover:bg-gray-300"
            >
              Upgrade
            </button>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
            <div className="h-full w-4/5 rounded-full bg-success" />
          </div>
          <p className="mt-1 text-xs text-gray-500">0 / 200</p>
        </div>
        <button
          type="button"
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-200"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <span>中文</span>
        </button>
        <button
          type="button"
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-200"
        >
          <div className="h-6 w-6 shrink-0 rounded-full bg-gray-300" />
          <span>我的账号</span>
        </button>
      </div>
    </aside>
  );
}
