"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { id: "brand", label: "品牌大脑", href: "/" },
  { id: "channels", label: "渠道账号", href: "/channels" },
  { id: "inspiration", label: "营销灵感库", href: "/inspiration" },
] as const;

export function TopTabs() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 h-14 shrink-0 border-b border-gray-200 bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.05)]">
      <div className="mx-auto flex h-full max-w-7xl px-6">
        {TABS.map((tab) => {
          const isActive =
            pathname === tab.href ||
            (tab.href !== "/" && pathname.startsWith(tab.href));

          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={`relative flex h-full items-center px-4 text-sm font-medium transition-colors duration-150 ${
                isActive
                  ? "text-black"
                  : "text-gray-500 hover:bg-gray-50 hover:text-black"
              }`}
            >
              {tab.label}
              {isActive && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                  aria-hidden
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
