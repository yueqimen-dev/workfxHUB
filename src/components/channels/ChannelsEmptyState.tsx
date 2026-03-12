"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { MultiModalInputBar } from "@/components/ui/MultiModalInputBar";

// 多组策略预设，点击「换一组」时轮换
const STRATEGY_PRESETS = [
  {
    label: "【极简/高冷】",
    cards: [
      { icon: "📸", platform: "Instagram", text: "延续【极简】视觉，侧重高感光产品图与生活方式叙事" },
      { icon: "🎵", platform: "TikTok", text: "保持【高冷】人设，但通过「快速剪辑」增加视听冲击力" },
      { icon: "✍️", platform: "官方 Blog", text: "深度承载【专业】基调，产出长篇行业趋势与技术白皮书" },
    ],
  },
  {
    label: "【活泼/年轻】",
    cards: [
      { icon: "📕", platform: "小红书", text: "主打【种草】笔记，高颜值图文 + 真实使用反馈" },
      { icon: "🐦", platform: "微博", text: "【热点追更】+ 品牌话题，与粉丝高频互动" },
      { icon: "📺", platform: "B站", text: "【知识向】长视频，深度测评与教程内容" },
    ],
  },
  {
    label: "【专业/B2B】",
    cards: [
      { icon: "💼", platform: "LinkedIn", text: "【精英人设】行业洞察与品牌故事，建立专业影响力" },
      { icon: "🌐", platform: "官网", text: "【权威承载】产品文档、案例库与资源下载" },
      { icon: "📰", platform: "行业媒体", text: "【背书输出】白皮书、行业报告与 PR 稿件" },
    ],
  },
];

type InputMode = "default" | "add_channel" | "micro_tune";

interface ChannelsEmptyStateProps {
  onSubmit: (text: string) => void;
  onStrategyConfirm?: () => void;
}

const PLACEHOLDERS: Record<InputMode, string> = {
  default: '比如："Blog 的画风要更有学术感，多用冷色调配图..."',
  add_channel:
    '请输入您想添加的渠道，例如："我还想加小红书和微博，定位是..."',
  micro_tune:
    '请描述您的调整需求，例如："TikTok 不要太严肃，可以更轻松好玩一点..."',
};

export function ChannelsEmptyState({
  onSubmit,
  onStrategyConfirm,
}: ChannelsEmptyStateProps) {
  const [presetIndex, setPresetIndex] = useState(0);
  const [inputMode, setInputMode] = useState<InputMode>("default");
  const [hintMessage, setHintMessage] = useState<string | null>(null);

  const currentPreset = STRATEGY_PRESETS[presetIndex % STRATEGY_PRESETS.length];

  const handleStrategyConfirm = () => {
    onStrategyConfirm?.() ?? onSubmit("策略很好，全按这个来");
  };

  const handleAddChannel = () => {
    setInputMode("add_channel");
    setHintMessage("💡 请在下方的输入框中说明您想添加的渠道及其定位～");
  };

  const handleMicroTune = () => {
    setInputMode("micro_tune");
    setHintMessage("💡 请在下方的输入框中描述您想调整的方向～");
  };

  const handleRegenerateStrategy = () => {
    const nextIndex = (presetIndex + 1) % STRATEGY_PRESETS.length;
    setPresetIndex(nextIndex);
    setHintMessage(`✨ 已切换为 ${STRATEGY_PRESETS[nextIndex].label} 风格策略`);
    setTimeout(() => setHintMessage(null), 3000);
  };

  const handleSubmit = (text: string) => {
    setHintMessage(null);
    setInputMode("default");
    onSubmit(text);
  };

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center px-6 py-16">
      <div className="flex max-w-2xl flex-col items-center gap-10">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold tracking-tight text-black md:text-3xl">
            ✨ 品牌基建已就绪！ 接下来，我们来微调各渠道的表达策略
          </h1>
        </div>

        <div className="w-full">
          <p className="mb-4 text-sm font-medium text-gray-600">
            💡 基于您的{currentPreset.label}品牌调性，我为您预设了以下差异化内容策略：
          </p>
          <div className="space-y-3">
            {currentPreset.cards.map((card) => (
              <div
                key={card.platform}
                className="rounded-lg border-2 border-gray-200 bg-white px-4 py-3"
              >
                <p className="font-medium text-black">
                  <span className="mr-2">{card.icon}</span>
                  <span>{card.platform}:</span>{" "}
                  <span className="font-normal text-gray-700">{card.text}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-sm text-gray-600">
          👆 您认可目前的策略吗？或者您对特定账号有更细节的要求？
        </p>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="secondary" size="md" onClick={handleStrategyConfirm}>
            ✅ 策略很好，全按这个来
          </Button>
          <Button variant="secondary" size="md" onClick={handleAddChannel}>
            ➕ 我想添加/补充其他渠道
          </Button>
          <Button variant="secondary" size="md" onClick={handleMicroTune}>
            ✏️ 我有其他想法，需要微调
          </Button>
          <Button variant="secondary" size="md" onClick={handleRegenerateStrategy}>
            🎲 换一组策略看看
          </Button>
        </div>
      </div>

      <div className="mt-auto w-full max-w-2xl border-t border-gray-200 pt-6">
        {hintMessage && (
          <p className="mb-3 rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-700">
            {hintMessage}
          </p>
        )}
        <MultiModalInputBar
          placeholder={PLACEHOLDERS[inputMode]}
          submitLabel="发送"
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
