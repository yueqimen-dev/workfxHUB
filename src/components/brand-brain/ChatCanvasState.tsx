"use client";

import { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/Button";
import type { BrandArchive, ChatMessage } from "@/lib/brand-brain-state";

interface ChatCanvasStateProps {
  archive: BrandArchive;
  onConfirm: () => void;
}

const SAMPLE_MESSAGES: ChatMessage[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "太棒了！我已经阅读完毕并为您提取了右侧的档案。您看看有什么需要修改的吗？",
  },
];

export function ChatCanvasState({ archive, onConfirm }: ChatCanvasStateProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(SAMPLE_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [editingArchive, setEditingArchive] = useState(archive);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleTextSelection = useCallback(() => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();
    if (text) {
      setSelectedText(text);
    } else {
      setSelectedText(null);
    }
  }, []);

  const addQuoteToInput = useCallback(() => {
    if (selectedText) {
      setInputValue((prev) => (prev ? `${prev}\n\n` : "") + `> "${selectedText}"\n`);
      setSelectedText(null);
    }
  }, [selectedText]);

  const handleSend = useCallback(() => {
    if (!inputValue.trim()) return;
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    // 模拟 AI 回复
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "收到！已为您在右侧面板实时更新了目标人群信息。",
        },
      ]);
    }, 800);
  }, [inputValue]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-[calc(100vh-7rem)]">
      <div className="flex w-[45%] min-w-[320px] flex-col border-r border-gray-200 bg-white">
        <div className="shrink-0 border-b border-gray-200 px-4 py-3">
          <h3 className="font-display text-sm font-semibold text-black">💬 品牌构建助手</h3>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-lg px-4 py-3 shadow-sm ${
                  msg.role === "user"
                    ? "bg-black text-white rounded-br-none"
                    : "bg-gray-100 text-black rounded-bl-none"
                }`}
              >
                {msg.quotedText && (
                  <blockquote className="mb-2 border-l-2 border-gray-400 pl-2 text-sm opacity-90">
                    {msg.quotedText}
                  </blockquote>
                )}
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
              placeholder="选中右侧文本进行修改..."
              className="flex-1 rounded-md border-2 border-gray-300 px-4 py-3 text-sm text-black transition-colors focus:border-black focus:outline-none focus:ring-[3px] focus:ring-black/10 placeholder:text-gray-400"
            />
            <Button size="md" onClick={handleSend} disabled={!inputValue.trim()}>
              发送
            </Button>
          </div>
          {selectedText && (
            <div className="mt-2 flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
              <span className="flex-1 truncate text-xs text-gray-600">
                已选: &quot;{selectedText.slice(0, 40)}
                {selectedText.length > 40 ? "…" : ""}&quot;
              </span>
              <Button size="sm" variant="secondary" onClick={addQuoteToInput}>
                添加到对话 ↙️
              </Button>
            </div>
          )}
        </div>
      </div>

      <div
        ref={canvasRef}
        className="flex-1 overflow-y-auto bg-gray-50"
        onMouseUp={handleTextSelection}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <h3 className="font-display text-sm font-semibold">
            📄 品牌结构化档案 v1.0
          </h3>
          <Button size="sm" onClick={onConfirm}>
            ✅ 确认并封版记忆
          </Button>
        </div>
        <div className="p-6 font-body text-sm leading-relaxed">
          {editingArchive.sections.map((section) => (
            <section key={section.id} className="mb-8">
              <h2 className="mb-4 font-display text-lg font-semibold text-black">
                {section.title}
              </h2>
              <ul className="space-y-2">
                {section.content.map((item, i) => (
                  <li
                    key={i}
                    className="select-text cursor-text rounded-md px-2 py-1.5 transition-colors hover:bg-gray-100"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
