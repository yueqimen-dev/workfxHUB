"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { AccountConfig, PlatformType } from "@/lib/channels-state";
import { PLATFORM_ICONS, PLATFORM_LABELS } from "@/lib/channels-state";

/** 当前支持绑定的平台（Instagram、TikTok 暂不支持） */
const PLATFORMS_WITH_BIND_SUPPORT: PlatformType[] = ["x", "blog"];

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
  const [bindModalAccount, setBindModalAccount] = useState<AccountConfig | null>(null);

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
    <div className="min-h-[calc(100vh-3.5rem)] px-6 py-8">
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
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-medium text-black">
                              @{acc.handle || "未命名"}
                            </p>
                            <div className="flex shrink-0 gap-1">
                              {acc.status !== "bound" &&
                                PLATFORMS_WITH_BIND_SUPPORT.includes(acc.platform) && (
                                  <button
                                    type="button"
                                    onClick={() => setBindModalAccount(acc)}
                                    className="rounded px-2 py-1 text-xs text-gray-500 hover:bg-gray-200 hover:text-black"
                                  >
                                    🔗 绑定
                                  </button>
                                )}
                              <button
                                type="button"
                                onClick={() => onEditAccount(acc.id)}
                                className="rounded px-2 py-1 text-xs text-gray-500 hover:bg-gray-200 hover:text-black"
                              >
                                ⚙️ 编辑
                              </button>
                            </div>
                          </div>
                          <p className="mt-2 text-xs text-gray-500">
                            状态：
                            {acc.status === "bound" ? (
                              <span className="text-success">✅ 已绑定</span>
                            ) : (
                              <span className="text-amber-600">⚠️ 仅有画风配置</span>
                            )}
                          </p>
                          <p className="mt-0.5 text-xs text-gray-600">
                            定位：{acc.positioning}
                          </p>
                          <p className="mt-0.5 text-xs text-gray-600">
                            尺寸：
                            {acc.visualSpecs.defaultSize || "-"}
                          </p>
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

      {/* 绑定账号弹窗 */}
      {bindModalAccount && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setBindModalAccount(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="mx-4 w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-base font-semibold text-black">
                🔗 绑定账号 · @{bindModalAccount.handle || "未命名"}
              </h3>
              <button
                type="button"
                onClick={() => setBindModalAccount(null)}
                className="text-gray-400 hover:text-black"
                aria-label="关闭"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3 rounded border border-dashed border-gray-300 bg-gray-50 p-4 text-center text-sm text-gray-500">
              <p>此处为绑定流程占位区域</p>
              <p>后续将接入各平台 OAuth 授权流程</p>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button size="sm" variant="secondary" onClick={() => setBindModalAccount(null)}>
                取消
              </Button>
              <Button size="sm">确认绑定</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
