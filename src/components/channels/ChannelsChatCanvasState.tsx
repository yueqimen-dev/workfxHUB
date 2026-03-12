"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { MultiModalInputBar } from "@/components/ui/MultiModalInputBar";
import type { AccountConfig } from "@/lib/channels-state";
import { PLATFORM_ICONS, PLATFORM_LABELS } from "@/lib/channels-state";

interface MatrixAccount {
  id: string;
  name: string;
  visual: string;
  tone: string;
}

interface MatrixPlatform {
  icon: string;
  name: string;
  accounts: MatrixAccount[];
}

interface ChannelsChatCanvasStateProps {
  accountConfig: AccountConfig;
  isEditMode?: boolean;
  onConfirmToDashboard: (config: AccountConfig) => void;
  onConfirmMatrix?: (accounts: AccountConfig[]) => void;
}

const INITIAL_MESSAGE = `搞定！我已经为您生成了该矩阵下所有账号的策略方案。

目前已为您配置了 3 个核心阵地。您可以：
1. 直接针对某个平台提要求。
2. 告诉我还需要增加什么新平台。

💡 您想先微调哪一个，还是直接开始生成内容?`;

const EDIT_MODE_AI_REPLY = `好的，我们针对该账号进行微调。您可以在下方输入具体的修改意见，例如：调整视觉风格、更改语感、补充定位等。`;

const MATRIX_DATA: MatrixPlatform[] = [
  {
    icon: "📸",
    name: "Instagram",
    accounts: [
      { id: "ig-1", name: "[账号 01] 官方主号", visual: "100% 继承 / 极致留白", tone: "高冷、专业" },
      { id: "ig-2", name: "[账号 02] 客服/私域号", visual: "继承 / 增加生活化滤镜", tone: "[变异] 亲和、带互动性" },
    ],
  },
  {
    icon: "🎵",
    name: "TikTok",
    accounts: [
      { id: "tk-1", name: "[账号 01] 官方剧情号", visual: "继承 / 工业废土感", tone: "[变异] 幽默、反差萌" },
    ],
  },
  {
    icon: "✍️",
    name: "官方 Blog",
    accounts: [
      { id: "blog-1", name: "[账号 01] 技术专栏", visual: "继承 / 冷色调配图", tone: "学术、深度" },
    ],
  },
];

export function ChannelsChatCanvasState({
  accountConfig,
  isEditMode = false,
  onConfirmToDashboard,
  onConfirmMatrix,
}: ChannelsChatCanvasStateProps) {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<{ id: string; role: "user" | "assistant"; content: string }[]>(() =>
    isEditMode
      ? []
      : [{ id: "1", role: "assistant" as const, content: INITIAL_MESSAGE }]
  );

  useEffect(() => {
    if (isEditMode && messages.length === 0) {
      const accountLabel = accountConfig.handle
        ? `@${accountConfig.handle}`
        : accountConfig.positioning;
      const userMsg = `我要针对 ${accountLabel} 这个账号进行调整`;
      setMessages([
        { id: "u1", role: "user", content: userMsg },
        { id: "a1", role: "assistant", content: EDIT_MODE_AI_REPLY },
      ]);
    }
  }, [isEditMode, accountConfig.handle, accountConfig.positioning]);

  const handleSend = useCallback((text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: "user" as const, content: text },
    ]);
    setInputValue("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant" as const,
          content: "收到！已为您更新右侧的配置。",
        },
      ]);
    }, 800);
  }, []);

  const handleQuickAction = (action: string) => {
    handleSend(action);
  };

  const handleConfirm = () => {
    if (isEditMode) {
      onConfirmToDashboard(accountConfig);
      return;
    }
    if (onConfirmMatrix) {
      const accounts: AccountConfig[] = MATRIX_DATA.flatMap((p) =>
        p.accounts.map((a) => ({
          id: a.id,
          platform:
            p.name === "Instagram" ? ("instagram" as const) :
            p.name === "TikTok" ? ("tiktok" as const) :
            p.name === "官方 Blog" ? ("blog" as const) : ("x" as const),
          status: "draft" as const,
          positioning: a.name,
          personaTone: a.tone,
          visualSpecs: { toneStyle: a.visual, layoutRules: [] },
          brandInherits: ["核心受众：25-35岁白领", "违禁词：平替、廉价"],
        }))
      );
      onConfirmMatrix(accounts);
    } else {
      onConfirmToDashboard(accountConfig);
    }
  };

  const icon = PLATFORM_ICONS[accountConfig.platform];
  const label = PLATFORM_LABELS[accountConfig.platform];

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      {/* 左侧：对话 */}
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
                className={`max-w-[85%] whitespace-pre-wrap rounded-lg px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "rounded-br-none bg-black text-white"
                    : "rounded-bl-none bg-gray-100 text-black"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          <div className="flex flex-wrap gap-2 pt-2">
            <Button variant="secondary" size="sm" onClick={() => handleQuickAction("微调 Instagram")}>
              ✍️ 微调 Instagram
            </Button>
            <Button variant="secondary" size="sm" onClick={() => handleQuickAction("微调 TikTok")}>
              ✍️ 微调 TikTok
            </Button>
            <Button variant="secondary" size="sm" onClick={() => handleQuickAction("增加新平台/账号")}>
              ➕ 增加新平台/账号
            </Button>
            <Button variant="secondary" size="sm" onClick={() => handleQuickAction("开始生成内容")}>
              🚀 开始生成内容
            </Button>
          </div>
        </div>
        <div className="shrink-0 border-t border-gray-200 bg-white p-4">
          <MultiModalInputBar
            placeholder="输入对特定账号的修改意见..."
            submitLabel="发送"
            onSubmit={handleSend}
            value={inputValue}
            onChange={setInputValue}
            compact
          />
        </div>
      </div>

      {/* 右侧：矩阵配置 / 单账号编辑 */}
      <div className="flex flex-1 flex-col overflow-y-auto bg-gray-50">
        <div className="sticky top-0 z-10 border-b border-gray-200 bg-white px-6 py-4">
          <h3 className="font-display text-sm font-semibold text-black">
            {isEditMode ? "✏️ 账号配置" : "📄 品牌全域发声矩阵 v1.0"}
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            🧬 核心基准：高端护肤 / 极简美学
          </p>
        </div>
        <div className="flex-1 p-6">
          {isEditMode ? (
            <div className="rounded-lg border border-gray-200 bg-white px-5 py-4">
              <h2 className="mb-3 font-display text-base font-semibold text-black">
                {icon} {label} · {accountConfig.handle ? `@${accountConfig.handle}` : accountConfig.positioning}
              </h2>
              <div className="space-y-2 text-sm text-gray-700">
                <p><span className="text-gray-500">定位：</span>{accountConfig.positioning}</p>
                <p><span className="text-gray-500">🎨 视觉：</span>{accountConfig.visualSpecs.toneStyle || "-"}</p>
                <p><span className="text-gray-500">💬 语感：</span>{accountConfig.personaTone || "-"}</p>
                <p><span className="text-gray-500">尺寸：</span>{accountConfig.visualSpecs.defaultSize || "-"}</p>
                <p className="pt-2 text-gray-500">品牌继承：{accountConfig.brandInherits?.join("；") || "-"}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {MATRIX_DATA.map((platform) => (
                <section key={platform.name}>
                  <h2 className="mb-3 font-display text-base font-semibold text-black">
                    {platform.icon} {platform.name}
                  </h2>
                  <div className="space-y-3">
                    {platform.accounts.map((acc) => (
                      <div key={acc.id} className="rounded-lg border border-gray-200 bg-white px-4 py-3">
                        <p className="mb-2 font-medium text-black">{acc.name}</p>
                        <div className="space-y-1 text-sm text-gray-700">
                          <p><span className="text-gray-500">🎨 视觉：</span>{acc.visual}</p>
                          <p><span className="text-gray-500">💬 语感：</span>{acc.tone}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
        <div className="shrink-0 border-t border-gray-200 bg-white p-4">
          <Button size="md" className="w-full" onClick={handleConfirm}>
            ✅ {isEditMode ? "保存并返回" : "确认全域配置"}
          </Button>
        </div>
      </div>
    </div>
  );
}
