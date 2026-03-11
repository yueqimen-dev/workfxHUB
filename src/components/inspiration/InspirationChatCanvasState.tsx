"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import type { InspirationAsset, ChatMessage, TemplateBlock } from "@/lib/inspiration-state";

interface InspirationChatCanvasStateProps {
  rawContent: string;
  initialTemplate: TemplateBlock[];
  initialTags: string[];
  onSave: (asset: Omit<InspirationAsset, "id" | "createdAt">) => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "1",
    role: "assistant",
    content:
      '搞定！这是一条非常典型的「制造对立+给出解法」的结构。我已经把它变成了可复用的模板（右侧）。您看需要调整吗？',
  },
];

export function InspirationChatCanvasState({
  rawContent,
  initialTemplate,
  initialTags,
  onSave,
}: InspirationChatCanvasStateProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [template, setTemplate] = useState<TemplateBlock[]>(initialTemplate);
  const [tags, setTags] = useState<string[]>(initialTags);

  const handleSend = useCallback(() => {
    if (!inputValue.trim()) return;
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "收到，已为您在右侧添加相应的渠道标签。",
        },
      ]);
      setTags((prev) => [...prev, "#适合TikTok"]);
    }, 800);
  }, [inputValue]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSave = () => {
    onSave({
      type: "hook",
      title: `爆款 Hook 模板 #${String(template.length).padStart(3, "0")}`,
      rawContent,
      template,
      tags,
    });
  };

  return (
    <div className="flex h-[calc(100vh-7rem)]">
      <div className="flex w-[45%] min-w-[320px] flex-col border-r border-gray-200 bg-white">
        <div className="shrink-0 border-b border-gray-200 px-4 py-3">
          <h3 className="font-display text-sm font-semibold text-black">
            💬 灵感提取助手
          </h3>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-lg px-4 py-3 shadow-sm ${
                  msg.role === "user"
                    ? "rounded-br-none bg-black text-white"
                    : "rounded-bl-none bg-gray-100 text-black"
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="shrink-0 border-t border-gray-200 bg-white p-4">
          <div className="flex items-end gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="指示AI修改模板细节..."
              className="flex-1 rounded-md border-2 border-gray-300 px-4 py-3 text-sm text-black transition-colors focus:border-black focus:outline-none focus:ring-[3px] focus:ring-black/10 placeholder:text-gray-400"
            />
            <Button size="md" onClick={handleSend} disabled={!inputValue.trim()}>
              发送
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto bg-gray-50">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <h3 className="font-display text-sm font-semibold text-black">
            📑 资产详情：爆款 Hook 模板 #001
          </h3>
          <Button size="sm" onClick={handleSave}>
            ✅ 确认并存入库
          </Button>
        </div>
        <div className="space-y-6 p-6 text-sm">
          <section>
            <p className="mb-2 font-medium text-black">🟢 原始素材：</p>
            <p className="rounded-lg border border-gray-200 bg-white p-3 text-gray-700">
              &ldquo;{rawContent.slice(0, 80)}
              {rawContent.length > 80 ? "…" : ""}&rdquo;
            </p>
          </section>

          <section>
            <p className="mb-3 font-medium text-black">🔄 AI 提炼的通用模板：</p>
            <div className="space-y-2">
              {template.map((block, i) => (
                <div key={i} className="rounded-lg border border-gray-200 bg-white p-3">
                  <p className="mb-1 text-xs font-medium text-gray-500">
                    [{block.step}]
                  </p>
                  <p className="text-gray-800">{block.content}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <p className="mb-2 font-medium text-black">🏷️ 自动打标：</p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="rounded-full bg-gray-200 px-3 py-1 text-xs text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
