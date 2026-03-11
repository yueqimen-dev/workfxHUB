"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface InspirationEmptyStateProps {
  onSubmit: (content: string) => void;
}

export function InspirationEmptyState({ onSubmit }: InspirationEmptyStateProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    const trimmed = inputValue.trim();
    if (trimmed) {
      onSubmit(trimmed);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-7rem)] flex-col items-center px-6 py-16">
      <div className="flex max-w-2xl flex-col items-center gap-10">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold tracking-tight text-black md:text-3xl">
            💡 欢迎来到你的【专属爆款弹药库】💡
          </h1>
          <p className="mt-4 text-base text-gray-600">
            &ldquo;不要让刷到的好创意溜走，丢给我，我帮你变成可复用模板&rdquo;
          </p>
        </div>

        <div className="w-full">
          <p className="mb-4 text-sm font-medium text-gray-600">
            👇 你可以这样开始建立你的灵感库：
          </p>
          <div className="space-y-3">
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
              <span className="text-gray-500">🔗</span>{" "}
              粘贴一个爆款 TikTok/IG 视频链接
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
              <span className="text-gray-500">📝</span>{" "}
              丢入一段你觉得很抓人的竞品文案前三秒
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
              <span className="text-gray-500">🖼️</span>{" "}
              上传一张排版绝佳的 Instagram 截图
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto w-full max-w-2xl border-t border-gray-200 pt-6">
        <div className="flex items-center gap-2 rounded-lg border-2 border-gray-300 bg-white p-2 transition-colors focus-within:border-black">
          <span className="shrink-0 text-sm text-gray-400">➕ 文件/链接</span>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="请输入你收集到的营销灵感..."
            className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-black outline-none placeholder:text-gray-400"
          />
          <Button size="sm" onClick={handleSubmit} disabled={!inputValue.trim()}>
            🚀 存入
          </Button>
        </div>
      </div>
    </div>
  );
}
