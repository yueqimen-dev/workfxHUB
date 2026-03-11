"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { UploadedItem } from "@/lib/brand-brain-state";

interface InputtingStateProps {
  items: UploadedItem[];
  onAddMore: (text: string) => void;
  onFileUpload?: (file: File) => void;
  onStartParse: () => void;
}

const typeIcons: Record<UploadedItem["type"], string> = {
  file: "📄",
  image: "🖼️",
  text: "📝",
  link: "🔗",
};

export function InputtingState({
  items,
  onAddMore,
  onFileUpload,
  onStartParse,
}: InputtingStateProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (trimmed) {
      onAddMore(trimmed);
      setInputValue("");
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
      <div className="flex max-w-2xl flex-col items-center gap-12">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold tracking-tight text-black md:text-4xl">
            ✨ 欢迎构建你的专属【品牌知识库】 ✨
          </h1>
        </div>

        <div className="w-full space-y-3">
          <p className="text-sm font-medium text-gray-600">已接收的内容：</p>
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 transition-shadow duration-150 hover:shadow-sm"
            >
              <span className="text-lg">{typeIcons[item.type]}</span>
              <span className="flex-1 text-sm text-gray-700">
                {item.type === "text" ? item.preview : item.name}
                {item.size && (
                  <span className="ml-2 text-gray-400">({item.size})</span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto w-full max-w-2xl border-t border-gray-200 pt-6">
        <div className="flex items-center gap-2 rounded-lg border-2 border-gray-300 bg-white p-2 transition-colors focus-within:border-black">
          <label className="cursor-pointer shrink-0">
            <input
              type="file"
              accept=".pdf,.doc,.docx,image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) onFileUpload?.(f);
                e.target.value = "";
              }}
            />
            <span className="text-gray-400 hover:text-black">➕</span>
          </label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="还可以继续添加..."
            className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-black outline-none placeholder:text-gray-400"
          />
          <Button size="md" onClick={onStartParse}>
            🚀 立即解析
          </Button>
        </div>
      </div>
    </div>
  );
}
