"use client";

import { MultiModalInputBar } from "@/components/ui/MultiModalInputBar";
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
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center px-6 py-16">
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
        <MultiModalInputBar
          placeholder="还可以继续添加..."
          onSubmit={onAddMore}
          onFileUpload={onFileUpload}
          primaryLabel="🚀 立即解析"
          onPrimaryClick={onStartParse}
        />
      </div>
    </div>
  );
}
