"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { AccountConfig } from "@/lib/channels-state";
import { PLATFORM_ICONS, PLATFORM_LABELS } from "@/lib/channels-state";

interface ChannelsMatrixDashboardProps {
  accounts: AccountConfig[];
  onAddAccount: () => void;
  onEditAccount: (id: string) => void;
  onBindAccount: (id: string) => void;
}

export function ChannelsMatrixDashboard({
  accounts,
  onAddAccount,
  onEditAccount,
  onBindAccount,
}: ChannelsMatrixDashboardProps) {
  const [expandedPlatforms, setExpandedPlatforms] = useState<Set<string>>(
    new Set(accounts.map((a) => a.platform))
  );

  const byPlatform = accounts.reduce<Record<string, AccountConfig[]>>(
    (acc, a) => {
      if (!acc[a.platform]) acc[a.platform] = [];
      acc[a.platform].push(a);
      return acc;
    },
    {}
  );

  const togglePlatform = (platform: string) => {
    setExpandedPlatforms((prev) => {
      const next = new Set(prev);
      if (next.has(platform)) next.delete(platform);
      else next.add(platform);
      return next;
    });
  };

  const totalAccounts = accounts.length;
  const totalPlatforms = Object.keys(byPlatform).length;

  return (
    <div className="min-h-[calc(100vh-7rem)] px-6 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-black">
            📊 您的全球发声矩阵 (共 {totalPlatforms} 个平台，{totalAccounts} 个账号)
          </h2>
          <Button size="sm" onClick={onAddAccount}>
            ➕ 新增账号
          </Button>
        </div>

        <div className="space-y-6">
          {Object.entries(byPlatform).map(([platform, platformAccounts]) => {
            const isExpanded = expandedPlatforms.has(platform);
            const label = PLATFORM_LABELS[platform as keyof typeof PLATFORM_LABELS];
            const icon = PLATFORM_ICONS[platform as keyof typeof PLATFORM_ICONS];

            return (
              <div
                key={platform}
                className="rounded-lg border border-gray-200 bg-white shadow-sm"
              >
                <button
                  type="button"
                  className="flex w-full items-center gap-2 px-4 py-3 text-left hover:bg-gray-50"
                  onClick={() => togglePlatform(platform)}
                >
                  <span
                    className={`transition-transform ${isExpanded ? "rotate-0" : "-rotate-90"}`}
                  >
                    ▼
                  </span>
                  <span className="text-xl">{icon}</span>
                  <span className="font-medium text-black">{label}</span>
                </button>

                {isExpanded && (
                  <div className="border-t border-gray-200 p-4">
                    <div className="flex flex-wrap gap-4">
                      {platformAccounts.map((acc) => (
                        <div
                          key={acc.id}
                          className="w-72 rounded-lg border border-gray-200 bg-gray-50 p-4"
                        >
                          <p className="font-medium text-black">
                            @{acc.handle || "未命名"}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            状态：
                            {acc.status === "bound" ? (
                              <span className="text-success">✅ 已绑定</span>
                            ) : (
                              <span className="text-amber-600">⚠️ 仅有画风配置</span>
                            )}
                          </p>
                          <p className="mt-1 text-xs text-gray-600">
                            定位：{acc.positioning}
                          </p>
                          <p className="mt-1 text-xs text-gray-600">
                            尺寸：
                            {acc.visualSpecs.defaultSize || "-"}
                          </p>
                          <div className="mt-3 flex gap-2">
                            {acc.status !== "bound" && (
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => onBindAccount(acc.id)}
                              >
                                🔗 去绑定
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => onEditAccount(acc.id)}
                            >
                              ⚙️ 编辑
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
