"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { PlatformSuggestion } from "@/lib/channels-state";

interface ChannelsEmptyStateProps {
  suggestions: PlatformSuggestion[];
  onSubmit: (text: string) => void;
}

export function ChannelsEmptyState({
  suggestions,
  onSubmit,
}: ChannelsEmptyStateProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (trimmed) {
      onSubmit(trimmed);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-7rem)] flex-col items-center px-6 py-16">
      <div className="flex max-w-2xl flex-col items-center gap-10">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold tracking-tight text-black md:text-3xl">
            🌍 品牌基建已就绪！接下来，我们要去哪个海外阵地发声？
          </h1>
        </div>

        <div className="w-full">
          <p className="mb-4 text-sm font-medium text-gray-600">
            💡 AI 智能推荐 (基于您的品牌调性)：
          </p>
          <div className="space-y-3">
            {suggestions.map((s) => (
              <div
                key={s.platform}
                className="flex items-center gap-4 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3"
              >
                <span className="text-xl">{s.icon}</span>
                <div>
                  <p className="font-medium text-black">
                    {s.label}: {s.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-sm text-gray-600">
          👇 请告诉我您想先做哪个平台？它的定位和画风是怎样的？
        </p>
      </div>

      <div className="mt-auto w-full max-w-2xl border-t border-gray-200 pt-6">
        <div className="flex items-center gap-2 rounded-lg border-2 border-gray-300 bg-white p-2 transition-colors focus-within:border-black">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='比如："我们想做 Instagram，账号定位是高端生活方式，画风需要高曝光、低饱和度的冷色调，排版要是1:1的方形图..."'
            className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-black outline-none placeholder:text-gray-400"
          />
          <Button size="sm" onClick={handleSend} disabled={!inputValue.trim()}>
            发送
          </Button>
        </div>
      </div>
    </div>
  );
}
