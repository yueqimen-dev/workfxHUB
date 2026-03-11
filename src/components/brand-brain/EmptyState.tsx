"use client";

import { MultiModalInputBar } from "@/components/ui/MultiModalInputBar";
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
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center px-6 py-16">
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
        <MultiModalInputBar
          placeholder="请输入关于你的品牌信息，越详细越好..."
          submitLabel="发送"
          onSubmit={onInputStart}
          onFileUpload={onFileUpload}
        />
      </div>
    </div>
  );
}
