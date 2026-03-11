"use client";

import { Button } from "@/components/ui/Button";
import type { BrandArchive } from "@/lib/brand-brain-state";

interface SavedPreviewStateProps {
  archive: BrandArchive;
  onEdit: () => void;
}

export function SavedPreviewState({ archive, onEdit }: SavedPreviewStateProps) {
  return (
    <div className="min-h-[calc(100vh-7rem)] px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-6 py-4">
          <div>
            <p className="text-sm text-gray-600">
              🟢 当前生效的品牌知识库：<strong className="text-black">{archive.name}</strong>
            </p>
            <p className="mt-1 text-xs text-gray-500">
              最近更新: {archive.updatedAt}
            </p>
          </div>
          <Button variant="secondary" size="sm" onClick={onEdit}>
            ✏️ 编辑品牌档案
          </Button>
        </div>

        <div className="space-y-10 border-t border-gray-200 pt-8">
          {archive.sections.map((section) => (
            <section key={section.id} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-display text-lg font-semibold text-black">
                {section.title}
              </h2>
              <ul className="space-y-2.5">
                {section.content.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-700 leading-relaxed">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-gray-400">
          ⬇️ 向下滚动查看完整文档
        </p>
      </div>
    </div>
  );
}
