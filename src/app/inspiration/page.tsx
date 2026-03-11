"use client";

import { useState, useCallback } from "react";
import { InspirationBreadcrumb } from "@/components/inspiration/InspirationBreadcrumb";
import { InspirationEmptyState } from "@/components/inspiration/InspirationEmptyState";
import { InspirationInputtingState } from "@/components/inspiration/InspirationInputtingState";
import { InspirationProcessingState } from "@/components/inspiration/InspirationProcessingState";
import { InspirationChatCanvasState } from "@/components/inspiration/InspirationChatCanvasState";
import { InspirationVaultDashboard } from "@/components/inspiration/InspirationVaultDashboard";
import type { InspirationState, InspirationAsset, TemplateBlock } from "@/lib/inspiration-state";

const SAMPLE_TEMPLATE: TemplateBlock[] = [
  {
    step: "1. 否定常识",
    content: '"不要再买昂贵的 {竞品类别/大众方案} 了！"',
  },
  {
    step: "2. 痛点场景",
    content: '"{痛点场景}，用这一个 {我们的产品} 就足够了！"',
  },
  {
    step: "3. 效果承诺",
    content: '"{使用频次}，{具体效果/时间} 让你 {预期效果}"',
  },
];

const SAMPLE_TAGS = ["#制造对立", "#快速转化"];

export default function InspirationPage() {
  const [state, setState] = useState<InspirationState>("empty");
  const [assets, setAssets] = useState<InspirationAsset[]>([]);
  const [pastedContent, setPastedContent] = useState("");
  const [currentTemplate, setCurrentTemplate] = useState<TemplateBlock[]>(SAMPLE_TEMPLATE);
  const [currentTags, setCurrentTags] = useState<string[]>(SAMPLE_TAGS);
  const [editingAssetId, setEditingAssetId] = useState<string | null>(null);

  const handleEmptySubmit = useCallback((content: string) => {
    setPastedContent(content);
    setEditingAssetId(null);
    setState("inputting");
  }, []);

  const handleDeconstruct = useCallback(() => {
    setState("processing");
    setTimeout(() => {
      setCurrentTemplate(SAMPLE_TEMPLATE);
      setCurrentTags(SAMPLE_TAGS);
      setState("chat_canvas");
    }, 5000);
  }, []);

  const handleSave = useCallback(
    (asset: Omit<InspirationAsset, "id" | "createdAt">) => {
      if (editingAssetId) {
        setAssets((prev) =>
          prev.map((a) =>
            a.id === editingAssetId
              ? { ...a, ...asset, createdAt: a.createdAt }
              : a
          )
        );
        setEditingAssetId(null);
      } else {
        const newAsset: InspirationAsset = {
          ...asset,
          id: `asset-${Date.now()}`,
          createdAt: new Date().toISOString().split("T")[0],
        };
        setAssets((prev) => [...prev, newAsset]);
      }
      setState("vault_dashboard");
    },
    [editingAssetId]
  );

  const handleAddMore = useCallback((content: string) => {
    setPastedContent(content);
    setEditingAssetId(null);
    setState("inputting");
  }, []);

  const handleUseTemplate = useCallback((_asset: InspirationAsset) => {
    // 跳转生文模块 - 占位
    alert("即将跳转至内容生成模块，携带该模板结构");
  }, []);

  const handleViewDetail = useCallback((asset: InspirationAsset) => {
    setPastedContent(asset.rawContent);
    setCurrentTemplate(asset.template);
    setCurrentTags(asset.tags);
    setEditingAssetId(asset.id);
    setState("chat_canvas");
  }, []);

  const effectiveState =
    state === "vault_dashboard" && assets.length === 0 ? "empty" : state;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <InspirationBreadcrumb showSearch={effectiveState === "vault_dashboard"} />

      {effectiveState === "empty" && (
        <InspirationEmptyState onSubmit={handleEmptySubmit} />
      )}
      {effectiveState === "inputting" && (
        <InspirationInputtingState
          pastedContent={pastedContent}
          onDeconstruct={handleDeconstruct}
        />
      )}
      {effectiveState === "processing" && <InspirationProcessingState />}
      {effectiveState === "chat_canvas" && (
        <InspirationChatCanvasState
          rawContent={pastedContent}
          initialTemplate={currentTemplate}
          initialTags={currentTags}
          onSave={handleSave}
        />
      )}
      {effectiveState === "vault_dashboard" && (
        <InspirationVaultDashboard
          assets={assets}
          onAddMore={handleAddMore}
          onUseTemplate={handleUseTemplate}
          onViewDetail={handleViewDetail}
        />
      )}
    </div>
  );
}
