"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface InspirationInputtingStateProps {
  pastedContent: string;
  onDeconstruct: (optionalInstruction?: string) => void;
}

export function InspirationInputtingState({
  pastedContent,
  onDeconstruct,
}: InspirationInputtingStateProps) {
  const [optionalNote, setOptionalNote] = useState("");

  const handleDeconstruct = () => {
    onDeconstruct(optionalNote.trim() || undefined);
  };

  return (
    <div className="flex min-h-[calc(100vh-7rem)] flex-col px-6 py-16">
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
        <div className="flex items-center justify-between gap-2 rounded-lg border-2 border-gray-300 bg-white p-2 transition-colors focus-within:border-black">
          <input
            type="text"
            value={optionalNote}
            onChange={(e) => setOptionalNote(e.target.value)}
            placeholder="还能补充你想对AI说的要求(选填)..."
            className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-black outline-none placeholder:text-gray-400"
          />
          <Button size="md" onClick={handleDeconstruct}>
            ✨ 让AI智能拆解
          </Button>
        </div>
      </div>
    </div>
  );
}
