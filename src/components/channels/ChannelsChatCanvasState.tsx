"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import { MultiModalInputBar } from "@/components/ui/MultiModalInputBar";
import type { AccountConfig, ChatMessage } from "@/lib/channels-state";
import { PLATFORM_LABELS } from "@/lib/channels-state";

interface ChannelsChatCanvasStateProps {
  accountConfig: AccountConfig;
  onConfirmToDashboard: (config: AccountConfig) => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "搞定！我已经为您生成了该 IG 账号的画风与定位。您看右侧的视觉规范准吗？如果没问题，您可以直接点击右侧绑定真实的 IG 账号。",
  },
];

export function ChannelsChatCanvasState({
  accountConfig,
  onConfirmToDashboard,
}: ChannelsChatCanvasStateProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [config, setConfig] = useState(accountConfig);
  const [showBindModal, setShowBindModal] = useState(false);

  const handleSend = useCallback((text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "没问题，已为您在右侧加上了 Logo 强制露出规则。",
        },
      ]);
      setConfig((prev) => ({
        ...prev,
        visualSpecs: {
          ...prev.visualSpecs,
          layoutRules: [
            ...(prev.visualSpecs.layoutRules || []),
            "[锁定] 必须带 Logo",
          ],
        },
      }));
    }, 800);
  }, []);

  const handleBindClick = () => {
    setShowBindModal(true);
  };

  const handleBindSuccess = () => {
    setShowBindModal(false);
    setConfig((prev) => ({ ...prev, status: "bound" as const }));
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      <div className="flex w-[45%] min-w-[320px] flex-col border-r border-gray-200 bg-white">
        <div className="shrink-0 border-b border-gray-200 px-4 py-3">
          <h3 className="font-display text-sm font-semibold text-black">
            💬 矩阵搭建助手
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
          <MultiModalInputBar
            placeholder="选中右侧文本微调画风..."
            submitLabel="发送"
            onSubmit={handleSend}
            value={inputValue}
            onChange={setInputValue}
            compact
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto bg-gray-50">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <h3 className="font-display text-sm font-semibold text-black">
            📱 账号配置：{PLATFORM_LABELS[config.platform]} (官方主号)
          </h3>
          <Button
            size="sm"
            onClick={config.status === "bound" ? undefined : handleBindClick}
            disabled={config.status === "bound"}
          >
            {config.status === "bound"
              ? "✅ 已绑定"
              : `🔗 去绑定真实的 ${PLATFORM_LABELS[config.platform]} 账号`}
          </Button>
        </div>
        <div className="p-6 font-body text-sm leading-relaxed">
          <div className="mb-6">
            <span
              className={`inline-block rounded px-2 py-1 text-xs font-medium ${
                config.status === "bound"
                  ? "bg-success/20 text-success"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {config.status === "bound" ? "✅ 已绑定真实账号" : "🔴 状态：[未绑定真实账号]"}
            </span>
          </div>

          <section className="mb-6">
            <h2 className="mb-3 font-display text-base font-semibold text-black">
              1. 账号定位与人设 (Override)
            </h2>
            <ul className="space-y-2">
              <li>• 定位：{config.positioning}</li>
              <li>• 语感：{config.personaTone}</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="mb-3 font-display text-base font-semibold text-black">
              2. 专属视觉规范
            </h2>
            <ul className="space-y-2">
              {config.visualSpecs.defaultSize && (
                <li>• 默认尺寸：{config.visualSpecs.defaultSize}</li>
              )}
              {config.visualSpecs.toneStyle && (
                <li>• 色调风格：{config.visualSpecs.toneStyle}</li>
              )}
              {config.visualSpecs.layoutRules?.map((r, i) => (
                <li key={i}>• 排版要求：{r}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-display text-base font-semibold text-black">
              3. 继承品牌大脑 (全局)
            </h2>
            <ul className="space-y-2">
              {config.brandInherits.map((item, i) => (
                <li key={i}>
                  <span className="text-gray-500">🔒</span> {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="border-t border-gray-200 bg-white p-4">
          <Button size="md" onClick={() => onConfirmToDashboard(config)}>
            完成并返回矩阵
          </Button>
        </div>
      </div>

      {showBindModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setShowBindModal(false)}
        >
          <div
            className="mx-4 w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-display text-lg font-semibold text-black">
              绑定 Instagram 账号
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              授权后将连接您的 Instagram 账号，用于同步发布与数据回传。
            </p>
            <div className="mt-6 flex gap-3">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => setShowBindModal(false)}
              >
                取消
              </Button>
              <Button className="flex-1" onClick={handleBindSuccess}>
                模拟授权成功
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
