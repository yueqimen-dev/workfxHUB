"use client";

import { useState, useCallback } from "react";
import { BrandBrainHeader } from "@/components/brand-brain/BrandBrainHeader";
import { EmptyState } from "@/components/brand-brain/EmptyState";
import { InputtingState } from "@/components/brand-brain/InputtingState";
import { ProcessingState } from "@/components/brand-brain/ProcessingState";
import { ChatCanvasState } from "@/components/brand-brain/ChatCanvasState";
import { SavedPreviewState } from "@/components/brand-brain/SavedPreviewState";
import type {
  BrandBrainState,
  UploadedItem,
  BrandArchive,
} from "@/lib/brand-brain-state";

const SAMPLE_ARCHIVE: BrandArchive = {
  id: "1",
  name: "自然之美",
  updatedAt: "2026-03-11",
  sections: [
    {
      id: "identity",
      title: "1. 品牌基础身份与故事",
      content: [
        "品牌定位：纯植物提取护肤",
        "Slogan：科技还原自然之美",
        "核心卖点：24小时持久保湿、0致敏添加",
      ],
    },
    {
      id: "audience",
      title: "2. 目标人群与痛点",
      content: [
        "核心人群：25-35岁一二线城市新锐白领",
        "核心痛点：长期面对电脑导致肌肤暗沉、工作压力大追求松弛感",
      ],
    },
    {
      id: "tone",
      title: "3. 文本语感与调性",
      content: [
        "沟通语气：专业严谨、温柔治愈、不爹味说教",
      ],
    },
    {
      id: "visual",
      title: "4. 视觉与审美资产",
      content: [
        "品牌主色调：#00FF00 (自然绿)、#FFFFFF (极简白)",
        "视觉风格：极简留白、日系清新、高光泽感",
      ],
    },
    {
      id: "guardrails",
      title: "5. 护栏与排他禁忌",
      content: [
        "禁用词汇：平替、廉价、化工",
        "竞品避让：品牌X、品牌Y",
      ],
    },
    {
      id: "calendar",
      title: "6. 营销日历规划",
      content: [
        "核心节点：3.8女神节、9月秋季抗敏周、双11大促",
      ],
    },
  ],
};

export default function BrandBrainPage() {
  const [state, setState] = useState<BrandBrainState>("empty");
  const [uploadedItems, setUploadedItems] = useState<UploadedItem[]>([]);
  const [archive, setArchive] = useState<BrandArchive>(SAMPLE_ARCHIVE);

  const handleInputStart = useCallback((text: string) => {
    const item: UploadedItem = {
      id: `text-${Date.now()}`,
      type: "text",
      name: "用户输入",
      preview: text.slice(0, 50) + (text.length > 50 ? "…" : ""),
    };
    setUploadedItems((prev) => [...prev, item]);
    setState("inputting");
  }, []);

  const handleFileUpload = useCallback((file: File) => {
    const item: UploadedItem = {
      id: `file-${Date.now()}`,
      type: file.type.startsWith("image/") ? "image" : "file",
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(1)}MB`,
    };
    setUploadedItems((prev) => [...prev, item]);
    setState("inputting");
  }, []);

  const handleLinkPaste = useCallback((url: string) => {
    const item: UploadedItem = {
      id: `link-${Date.now()}`,
      type: "link",
      name: url,
    };
    setUploadedItems((prev) => [...prev, item]);
    setState("inputting");
  }, []);

  const handleAddMore = useCallback((text: string) => {
    const item: UploadedItem = {
      id: `text-${Date.now()}`,
      type: "text",
      name: "用户输入",
      preview: text.slice(0, 50) + (text.length > 50 ? "…" : ""),
    };
    setUploadedItems((prev) => [...prev, item]);
  }, []);

  const handleStartParse = useCallback(() => {
    setState("processing");
    setTimeout(() => setState("chat_canvas"), 5000);
  }, []);

  const handleConfirm = useCallback(() => {
    setState("saved_preview");
  }, []);

  const handleEdit = useCallback(() => {
    setState("chat_canvas");
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <BrandBrainHeader
        state={state}
        onEdit={state === "saved_preview" ? handleEdit : undefined}
      />
      <main className="flex-1">
        {state === "empty" && (
          <EmptyState
            onInputStart={handleInputStart}
            onFileUpload={handleFileUpload}
            onLinkPaste={handleLinkPaste}
          />
        )}
        {state === "inputting" && (
          <InputtingState
            items={uploadedItems}
            onAddMore={handleAddMore}
            onFileUpload={handleFileUpload}
            onStartParse={handleStartParse}
          />
        )}
        {state === "processing" && <ProcessingState />}
        {state === "chat_canvas" && (
          <ChatCanvasState archive={archive} onConfirm={handleConfirm} />
        )}
        {state === "saved_preview" && (
          <SavedPreviewState archive={archive} onEdit={handleEdit} />
        )}
      </main>
    </div>
  );
}
