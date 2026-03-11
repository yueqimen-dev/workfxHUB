"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface BrandBrainHeaderProps {
  state: "empty" | "inputting" | "processing" | "chat_canvas" | "saved_preview";
  onEdit?: () => void;
}

export function BrandBrainHeader({ state, onEdit }: BrandBrainHeaderProps) {
  return (
    <header className="sticky top-14 z-40 h-14 w-full shrink-0 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        <Link href="/" className="font-display text-xl font-extrabold tracking-tight transition-colors hover:text-gray-700">
          品牌大脑
        </Link>
        <span className="text-sm text-gray-500">Brand Brain</span>
        {state === "saved_preview" && onEdit && (
          <Button variant="secondary" size="sm" onClick={onEdit}>
            ✏️ 编辑品牌档案
          </Button>
        )}
      </div>
    </header>
  );
}
