"use client";

import { useState } from "react";
import { MultiModalInputBar } from "@/components/ui/MultiModalInputBar";

const TAGS = [
  { label: "基础信息", template: "品牌名称、所属行业、成立时间、主营产品/服务..." },
  { label: "目标人群", template: "目标用户画像、年龄段、消费能力、核心痛点..." },
  { label: "品牌调性", template: "品牌人设、沟通语气、视觉风格..." },
  { label: "品牌红线", template: "禁用词汇、竞品避让、合规红线..." },
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

  const handleTagClick = (template: string) => {
    setInputValue((prev) => (prev ? `${prev}\n\n${template}` : template));
  };

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center px-6 py-16">
      <div className="flex max-w-2xl flex-col items-center gap-10">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold tracking-tight text-black md:text-4xl">
            ✨ 欢迎构建你的专属【品牌知识库】 ✨
          </h1>
          <p className="mt-4 text-base text-gray-600 md:text-lg">
            &ldquo;把关于品牌的一切都丢给我，我来帮你提炼品牌核心基因&rdquo;
          </p>
        </div>

        <div className="flex w-full flex-col items-center gap-4">
          <p className="text-center text-sm font-medium text-gray-600">
            💡 不知从何说起？点击下方标签，获取快捷输入模板：
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {TAGS.map((tag) => (
              <button
                key={tag.label}
                type="button"
                onClick={() => handleTagClick(tag.template)}
                className="rounded-lg border-2 border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:border-black hover:bg-gray-50 hover:text-black"
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 px-6 py-8">
          <p className="mb-4 text-center text-sm font-medium text-gray-600">
            🧩 专属品牌 DNA 档案预览
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
            <div>• 核心定位: ...</div>
            <div>• 核心受众: ...</div>
            <div>• 品牌人设: ...</div>
            <div>• 沟通避坑: ...</div>
          </div>
          <p className="mt-4 text-center text-xs text-gray-400">
            ( 投喂你的碎片信息，我来生成专属结构化档案 )
          </p>
        </div>
      </div>

      <div className="mt-auto w-full max-w-2xl border-t border-gray-200 pt-6">
        <MultiModalInputBar
          placeholder="输入品牌介绍，或直接粘贴相关资料或截图..."
          submitLabel="发送"
          onSubmit={onInputStart}
          onFileUpload={onFileUpload}
          value={inputValue}
          onChange={setInputValue}
        />
      </div>
    </div>
  );
}
