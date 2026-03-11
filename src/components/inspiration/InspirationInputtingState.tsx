"use client";

import { MultiModalInputBar } from "@/components/ui/MultiModalInputBar";

interface InspirationInputtingStateProps {
  pastedContent: string;
  onDeconstruct: (optionalInstruction?: string) => void;
}

export function InspirationInputtingState({
  pastedContent,
  onDeconstruct,
}: InspirationInputtingStateProps) {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col px-6 py-16">
      <div className="mx-auto flex max-w-2xl flex-col gap-10">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold tracking-tight text-black md:text-3xl">
            💡 欢迎来到你的【专属爆款弹药库】💡
          </h1>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">[用户已粘贴内容：]</p>
          <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-4">
            <p className="whitespace-pre-wrap text-sm text-gray-700">
              &ldquo;{pastedContent}&rdquo;
            </p>
          </div>
        </div>
      </div>

      <div className="mt-auto w-full max-w-2xl border-t border-gray-200 pt-6">
        <MultiModalInputBar
          placeholder="还能补充你想对AI说的要求(选填)..."
          onSubmit={(t) => onDeconstruct(t.trim() || undefined)}
          primaryLabel="✨ 让AI智能拆解"
          onPrimaryClick={(v) => onDeconstruct(v || undefined)}
        />
      </div>
    </div>
  );
}
