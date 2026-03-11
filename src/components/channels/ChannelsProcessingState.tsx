"use client";

import { useEffect, useState } from "react";

const PROCESSING_MESSAGES = [
  "正在继承【自然之美】品牌的全局基因...",
  "正在为您提炼 Instagram 的视觉规范...",
  "正在设定该平台专属的沟通语感...",
];

export function ChannelsProcessingState() {
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
            正在构建账号人设...
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
      </div>

      <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white px-6 py-4">
        <p className="text-center text-sm text-gray-400">输入框暂时不可用</p>
      </div>
    </div>
  );
}
