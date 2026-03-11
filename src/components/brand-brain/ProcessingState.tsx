"use client";

import { useEffect, useState } from "react";

const PROCESSING_MESSAGES = [
  "正在阅读您的品牌手册...",
  "正在提取您的核心卖点与目标人群...",
  "正在分析您的视觉偏好...",
];

export function ProcessingState() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PROCESSING_MESSAGES.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-6">
      <div className="flex max-w-md flex-col items-center gap-10">
        <div className="text-center">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 animate-pulse">
            <span className="text-2xl">⚙️</span>
          </div>
          <h2 className="font-display text-xl font-semibold text-black">
            正在解析中...
          </h2>
        </div>

        <div className="space-y-3 text-center">
          {PROCESSING_MESSAGES.map((msg, i) => (
            <p
              key={msg}
              className={`text-sm transition-opacity duration-300 ${
                i === currentIndex ? "text-black" : "text-gray-400"
              }`}
            >
              &ldquo;{msg}&rdquo;
            </p>
          ))}
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 px-6 py-4 text-center shadow-sm">
          <p className="text-sm text-gray-600">
            💡 提示：解析完成后，我们将为您生成一份结构化的品牌档案。
          </p>
          <p className="mt-2 text-sm text-gray-500">
            如果有遗漏或偏差，您可以直接在下一步与我对话修改。
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white px-6 py-4">
        <p className="text-center text-sm text-gray-400">输入框暂时不可用</p>
      </div>
    </div>
  );
}
