"use client";

import { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { MultiModalInputBar } from "@/components/ui/MultiModalInputBar";
import type { BrandArchive, ChatMessage, ChatCanvasVariant } from "@/lib/brand-brain-state";

interface ChatCanvasStateProps {
  archive: BrandArchive;
  onConfirm: () => void;
  variant?: ChatCanvasVariant;
}

// 4.1 极度干瘪
const VARIANT_4_1 = {
  messages: [
    {
      id: "1",
      role: "assistant" as const,
      content:
        '收到！「精酿啤酒」赛道很棒 🍻！\n\n为了帮您搭建完整的品牌库，我们一步步来。\n首先，您的酒主要是想卖给哪类人群呢？\n\n(您可以直接打字，或者点击下方快捷标签)',
    },
  ],
  quickTags: [
    "下班微醺的打工人",
    "追求风味的资深酒客",
    "聚会狂欢的学生党",
    "帮我生成一个人群",
  ],
  placeholder: "回答关于目标人群的问题...",
  rightHeader: "📄 专属品牌蓝图 v0.1",
  rightSub: "🔴 信息丰度：极低 —— 缺乏核心要素",
  rightBtn: "⏳ 无法封版",
  rightBtnDisabled: true,
  rightContent: [
    { title: "1. 基础信息", items: ["产品定位：精酿啤酒"] },
    {
      title: "2. 目标人群",
      items: [],
      placeholder: "✍️ 待补充：您的产品主要解决谁的需求？",
    },
    { title: "3. 品牌调性", items: [], placeholder: "待补充" },
    { title: "4. 品牌红线", items: [], placeholder: "待补充" },
    { title: "6. 营销策略与关键节点", locked: true, note: "尚未解锁" },
  ],
};

// 4.2 骨架完整但无血肉
const VARIANT_4_2 = {
  messages: [
    {
      id: "1",
      role: "assistant" as const,
      content:
        '骨架搭好啦！目前的定位是「高端年轻精酿」。\n\n不过目前的细节还比较单薄，不足以支撑我为您推演高质量的【全年营销日历】哦。\n\n💡 您可以点击右侧高亮的 [ ✍️ 补充 ] 标签，我们针对性地深挖一下细节！',
    },
  ],
  quickTags: [],
  placeholder: "点击右侧标签，或输入补充细节...",
  rightHeader: "📄 专属品牌蓝图 v0.5",
  rightSub: "🟡 信息丰度：基础 —— 补充细节解锁日历",
  rightBtn: "✅ 确认并存储",
  rightBtnDisabled: false,
  rightContent: [
    { title: "1. 基础信息", items: ["精酿啤酒"] },
    {
      title: "2. 目标人群",
      items: ["核心人群：年轻人"],
      supplement: "✍️ 补充：具体是白领还是大学生？场景？",
    },
    {
      title: "3. 品牌调性",
      items: ["品牌人设：高端"],
      supplement: "✍️ 补充：视觉是暗黑系还是极简留白？",
    },
    {
      title: "4. 品牌红线",
      items: [],
      supplement: "✍️ 补充：绝不碰的廉价词汇？",
    },
    { title: "6. 营销策略与关键节点", locked: true, note: "尚未解锁" },
  ],
};

// 4.3 信息丰满
const VARIANT_4_3 = {
  messages: [
    {
      id: "1",
      role: "assistant" as const,
      content:
        '太棒了！「一二线白领」+「赛博朋克果啤」的定位非常有画面感！\n\n✨ 叮！信息丰度已达标！\n\n我已为您自动解锁，并推演了专属的【营销策略与关键节点】，快看看右边合不合适！',
    },
  ],
  quickTags: [],
  placeholder: "查阅蓝图，或提出修改意见...",
  rightHeader: "📄 专属品牌蓝图 v1.0",
  rightSub: "🟢 信息丰度：极佳",
  rightBtn: "✅ 确认并存储",
  rightBtnDisabled: false,
  rightContent: [
    { title: "2. 目标人群", items: ["一二线都市白领，追求下班后的微醺"] },
    { title: "3. 品牌调性", items: ["赛博朋克风，前卫大胆"] },
    { title: "4. 品牌红线", items: ["不使用「拼酒」、「买醉」等低级词汇"] },
    {
      title: "🌟 5. 扩展品牌资产",
      items: ["📦 [ 核心卖点 ] : 独家鲜榨果汁融合发酵技术"],
    },
    {
      title: "🔓 6. 营销策略与关键节点 ✨",
      items: [
        "🎯 策略：打造「赛博修仙」的周末微醺场景",
        "📍 Q1 春季：推出「桃花酿」赛博限定版...",
        "📍 Q2 盛夏：举办地下电音精酿派对...",
      ],
    },
  ],
};

// 4.4 局部微调
const VARIANT_4_4 = {
  messages: [
    {
      id: "1",
      role: "user" as const,
      content: "视觉别弄赛博朋克了，换成「日系露营风」吧。",
    },
    {
      id: "2",
      role: "assistant" as const,
      content:
        '收到！日系露营风确实更契合当下的户外热潮。\n\n我已经更新了【品牌调性】。\n\n同时，我帮您把 Q2 的营销活动也顺手改成「草坪露营精酿节」啦，您看右边最新的日历！',
    },
  ],
  quickTags: [],
  placeholder: "继续调整其他细节...",
  rightHeader: "📄 专属品牌蓝图 v1.1",
  rightSub: "🟢 信息丰度：极佳",
  rightBtn: "✅ 确认并存储",
  rightBtnDisabled: false,
  rightContent: [
    { title: "2. 目标人群", items: ["一二线都市白领，追求下班后的微醺"] },
    {
      title: "3. 品牌调性",
      items: [],
      updated: "✨ 🔄 已更新：日系露营风，自然原木质感",
    },
    { title: "4. 品牌红线", items: ["不使用「拼酒」、「买醉」等低级词汇"] },
    {
      title: "🔓 6. 营销策略与关键节点",
      items: [
        "🎯 策略：绑定周末户外逃离计划",
        "📍 Q1 春季：推出「春日樱花」野餐装...",
        "",
      ],
      updatedItem: "✨ 🔄 📍 Q2 盛夏：举办草坪露营微醺节...",
    },
  ],
};

// 4.5 异常边界
const VARIANT_4_5 = {
  messages: [
    {
      id: "1",
      role: "user" as const,
      content: "我们这款酒的客单价大概在 800 元/瓶。",
    },
    {
      id: "2",
      role: "assistant" as const,
      content:
        '💡 稍等，我发现一个小冲突：\n\n您之前提到受众是「无收入的学生党」，但 800 元的客单价对他们来说可能过高了。\n\n我们需要把目标人群调整为「高净值商务人士」或「资深精酿收藏家」吗？',
    },
  ],
  quickTags: ["调整为资深收藏家", "客单价写错了，是80"],
  placeholder: "回复以解决定位冲突...",
  rightHeader: "📄 专属品牌蓝图 v0.8",
  rightSub: "🟡 信息丰度：基础 —— 存在逻辑冲突",
  rightBtn: "✅ 确认并存储",
  rightBtnDisabled: false,
  rightContent: [
    { title: "1. 基础信息", items: ["客单价 800 元的高端精酿"] },
    {
      title: "2. 目标人群",
      items: [],
      conflict: "⚠️ 冲突待决：无收入学生党 vs 高客单价",
      supplement: "✍️ 点击解决：调整受众，或调整定价？",
    },
    { title: "3. 品牌调性", items: ["高端、尊贵"] },
    { title: "4. 品牌红线", items: ["不使用「便宜」、「拼酒」等词汇"] },
    { title: "6. 营销策略与关键节点", locked: true, note: "解决冲突后生成" },
  ],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const VARIANTS: Record<string, any> = {
  "4.1": VARIANT_4_1,
  "4.2": VARIANT_4_2,
  "4.3": VARIANT_4_3,
  "4.4": VARIANT_4_4,
  "4.5": VARIANT_4_5,
};

const DEFAULT_MESSAGES: ChatMessage[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "太棒了！我已经阅读完毕并为您提取了右侧的档案。您看看有什么需要修改的吗？",
  },
];

export function ChatCanvasState({
  archive,
  onConfirm,
  variant = "default",
}: ChatCanvasStateProps) {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(DEFAULT_MESSAGES);
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const isVariant = variant !== "default";
  const data = isVariant ? VARIANTS[variant] : null;

  const handleTextSelection = useCallback(() => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();
    setSelectedText(text || null);
  }, []);

  const addQuoteToInput = useCallback(() => {
    if (selectedText) {
      setInputValue((prev) => (prev ? `${prev}\n\n` : "") + `> "${selectedText}"\n`);
      setSelectedText(null);
    }
  }, [selectedText]);

  const handleSend = useCallback((text: string) => {
    if (!text.trim()) return;
    // 模拟发送
    setInputValue("");
  }, []);

  if (isVariant && data) {
    return (
      <div className="flex h-[calc(100vh-3.5rem)]">
        <div className="flex w-[45%] min-w-[320px] flex-col border-r border-gray-200 bg-white">
          <div className="shrink-0 border-b border-gray-200 px-4 py-3">
            <h3 className="font-display text-sm font-semibold text-black">💬 品牌构建助手</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {data.messages.map((msg: { id: string; role: string; content: string }) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-lg px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-black text-white rounded-br-none"
                      : "bg-gray-100 text-black rounded-bl-none"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {data.quickTags?.length ? (
              <div className="flex flex-wrap gap-2 pt-2">
                {data.quickTags.map((tag: string) => (
                  <button
                    key={tag}
                    type="button"
                    className="rounded-lg border-2 border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-black hover:text-black"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <div className="shrink-0 border-t border-gray-200 bg-white p-4">
            <MultiModalInputBar
              placeholder={data.placeholder}
              submitLabel="发送"
              onSubmit={handleSend}
              value={inputValue}
              onChange={setInputValue}
              compact
            />
          </div>
        </div>

        <div
          ref={canvasRef}
          className="flex-1 overflow-y-auto bg-gray-50"
          onMouseUp={handleTextSelection}
        >
          <div className="sticky top-0 z-10 border-b border-gray-200 bg-white px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-sm font-semibold text-black">{data.rightHeader}</h3>
                <p className="mt-0.5 text-xs text-gray-500">{data.rightSub}</p>
              </div>
              <Button
                size="sm"
                onClick={onConfirm}
                disabled={data.rightBtnDisabled}
                className={data.rightBtnDisabled ? "opacity-60 cursor-not-allowed" : ""}
              >
                {data.rightBtn}
              </Button>
            </div>
          </div>
          <div className="p-6 text-sm leading-relaxed">
            {data.rightContent.map((section: { title: string; items?: string[]; placeholder?: string; supplement?: string; locked?: boolean; note?: string; updated?: string; updatedItem?: string; conflict?: string }, i: number) => (
              <section key={i} className="mb-6">
                <h2 className="mb-3 font-display text-base font-semibold text-black">
                  {section.title}
                </h2>
                {section.locked ? (
                  <p className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-gray-500">
                    🔒 {section.note}
                  </p>
                ) : (
                  <>
                    {section.items?.map((item, j) => (
                      <div key={j} className="mb-2 select-text rounded-md px-2 py-1.5 hover:bg-gray-100">
                        {item}
                      </div>
                    ))}
                    {section.updated && (
                      <div className="rounded-lg border-2 border-green-200 bg-green-50 px-4 py-3 text-green-800">
                        {section.updated}
                      </div>
                    )}
                    {section.updatedItem && (
                      <div className="rounded-lg border-2 border-green-200 bg-green-50 px-4 py-3 text-green-800">
                        {section.updatedItem}
                      </div>
                    )}
                    {section.conflict && (
                      <div className="rounded-lg border-2 border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">
                        {section.conflict}
                      </div>
                    )}
                    {(section.placeholder || section.supplement) && (
                      <div className="mt-2 rounded-lg border-2 border-dashed border-gray-300 bg-white px-4 py-3 text-gray-500">
                        {section.supplement || section.placeholder}
                      </div>
                    )}
                  </>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 默认状态
  const [editingArchive] = useState(archive);

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
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
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="shrink-0 border-t border-gray-200 bg-white p-4">
          <div className="space-y-2">
            <MultiModalInputBar
              placeholder="选中右侧文本进行修改..."
              submitLabel="发送"
              onSubmit={(text) => {
                if (text.trim()) {
                  setMessages((prev) => [
                    ...prev,
                    {
                      id: Date.now().toString(),
                      role: "user",
                      content: text,
                    },
                  ]);
                  setInputValue("");
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
                }
              }}
              value={inputValue}
              onChange={setInputValue}
              compact
            />
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
