"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

const DIMENSIONS = [
  "基础身份",
  "目标人群",
  "文本语感",
  "视觉审美",
  "排他禁忌",
  "营销日历",
];

interface EmptyStateProps {
  onInputStart: (text: string) => void;
  onFileUpload?: (file: File) => void;
  onLinkPaste?: (url: string) => void;
}

export function EmptyState({
  onInputStart,
  onFileUpload,
  onLinkPaste,
}: EmptyStateProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (trimmed) {
      onInputStart(trimmed);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileUpload?.(file);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-7rem)] flex-col items-center px-6 py-16">
      <div className="flex max-w-2xl flex-col items-center gap-12">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold tracking-tight text-black md:text-4xl">
            ✨ 欢迎构建你的专属【品牌知识库】 ✨
          </h1>
          <p className="mt-4 text-base text-gray-600 md:text-lg">
            &ldquo;把关于品牌的一切都丢给我，我来帮你提炼品牌核心基因&rdquo;
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {DIMENSIONS.map((dim) => (
            <span
              key={dim}
              className="rounded-full border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-500 transition-colors duration-150"
            >
              {dim}
            </span>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4">
          <p className="text-sm font-medium text-gray-600">💡 你可以这样开始：</p>
          <div className="flex flex-wrap justify-center gap-4">
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={handleFileChange}
              />
              <span className="inline-flex items-center gap-2 rounded-md border-2 border-gray-300 px-4 py-3 text-sm transition-colors duration-150 hover:border-black hover:bg-gray-50">
                📎 上传品牌手册 PDF
              </span>
            </label>
            <Button
              variant="secondary"
              size="md"
              onClick={() => {
                const url = window.prompt("请输入品牌官网或公众号链接");
                if (url) onLinkPaste?.(url);
              }}
            >
              🔗 粘贴品牌官网/公众号链接
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-auto w-full max-w-2xl border-t border-gray-200 pt-6">
        <div className="flex items-center gap-2 rounded-lg border-2 border-gray-300 bg-white p-2 transition-colors focus-within:border-black">
          <span className="shrink-0 text-gray-400 text-sm">➕</span>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="请输入关于你的品牌信息，越详细越好..."
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
