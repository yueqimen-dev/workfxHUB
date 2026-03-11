"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { MultiModalInputBar } from "@/components/ui/MultiModalInputBar";
import type { InspirationAsset } from "@/lib/inspiration-state";

interface InspirationVaultDashboardProps {
  assets: InspirationAsset[];
  onAddMore: (content: string) => void;
  onUseTemplate: (asset: InspirationAsset) => void;
  onViewDetail: (asset: InspirationAsset) => void;
}

export function InspirationVaultDashboard({
  assets,
  onAddMore,
  onUseTemplate,
  onViewDetail,
}: InspirationVaultDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("全部");
  const [platformFilter, setPlatformFilter] = useState("全部");

  const typeLabels: Record<string, string> = {
    hook: "🪝 模板",
    script: "📄 结构",
    visual: "🖼️ 视觉",
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] px-6 py-8">
      <div className="mx-auto max-w-5xl">
        {/* 搜索 */}
        <div className="mb-6 flex justify-end">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="🔍 搜索..."
            className="w-48 rounded-md border-2 border-gray-300 px-3 py-1.5 text-sm text-black outline-none placeholder:text-gray-400 focus:border-black"
          />
        </div>

        {/* 随手投喂口 */}
        <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-3">
          <MultiModalInputBar
            placeholder="➕ 粘贴素材链接或文本..."
            submitLabel="🚀 存入"
            onSubmit={onAddMore}
          />
        </div>

        {/* 筛选 */}
        <div className="mb-6 flex flex-wrap gap-2">
          <select
            className="rounded-md border-2 border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 focus:border-black focus:outline-none"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="全部">分类：全部</option>
            <option value="hook">Hook 模板</option>
            <option value="script">测评脚本</option>
          </select>
          <select
            className="rounded-md border-2 border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 focus:border-black focus:outline-none"
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
          >
            <option value="全部">适用：Instagram</option>
            <option value="tiktok">TikTok</option>
            <option value="x">X</option>
          </select>
          <span className="flex items-center gap-1 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-600">
            #制造对立 <span className="cursor-pointer">✖️</span>
          </span>
        </div>

        {/* 瀑布流卡片 */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="flex flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
            >
              <p className="mb-2 font-medium text-black">
                {typeLabels[asset.type] || asset.type}：{asset.title}
              </p>
              <div className="mb-3 flex-1 space-y-1 text-xs text-gray-600">
                {asset.template.slice(0, 3).map((block, i) => (
                  <p key={i}>
                    {i + 1}. {block.content.slice(0, 30)}
                    {block.content.length > 30 ? "…" : ""}
                  </p>
                ))}
              </div>
              <div className="mb-3 flex flex-wrap gap-1">
                {asset.tags.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => onUseTemplate(asset)}
                >
                  🚀 去生成
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => onViewDetail(asset)}
                >
                  ⚙️ 详情
                </Button>
              </div>
            </div>
          ))}
        </div>

        {assets.length === 0 && (
          <div className="rounded-lg border border-gray-200 bg-gray-50 py-16 text-center text-gray-500">
            暂无灵感资产，快去投喂第一条吧！
          </div>
        )}
      </div>
    </div>
  );
}
