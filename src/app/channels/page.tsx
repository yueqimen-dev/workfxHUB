"use client";

import { useState, useCallback } from "react";
import { ChannelsEmptyState } from "@/components/channels/ChannelsEmptyState";
import { ChannelsProcessingState } from "@/components/channels/ChannelsProcessingState";
import { ChannelsChatCanvasState } from "@/components/channels/ChannelsChatCanvasState";
import { ChannelsMatrixDashboard } from "@/components/channels/ChannelsMatrixDashboard";
import type {
  ChannelsState,
  AccountConfig,
} from "@/lib/channels-state";
import { PLATFORM_SUGGESTIONS } from "@/lib/channels-state";

const SAMPLE_ACCOUNT_CONFIG: AccountConfig = {
  id: "ig-1",
  platform: "instagram",
  handle: "NatureBeauty_Official",
  status: "draft",
  positioning: "高端植物护肤美学",
  personaTone: "比主品牌更带网感和互动性",
  visualSpecs: {
    defaultSize: "1:1 (IG 方图)",
    toneStyle: "低饱和度、冷色调、高冷",
    layoutRules: [],
  },
  brandInherits: ["核心受众：25-35岁白领", "违禁词：平替、廉价"],
};

export default function ChannelsPage() {
  const [state, setState] = useState<ChannelsState>("empty_suggestion");
  const [accounts, setAccounts] = useState<AccountConfig[]>([]);
  const [currentAccountConfig, setCurrentAccountConfig] =
    useState<AccountConfig>(SAMPLE_ACCOUNT_CONFIG);

  const handleEmptySubmit = useCallback((text: string) => {
    setState("processing");
    setTimeout(() => {
      setCurrentAccountConfig({
        ...SAMPLE_ACCOUNT_CONFIG,
        id: `ig-${Date.now()}`,
      });
      setState("chat_canvas_bind");
    }, 5000);
  }, []);

  const handleConfirmToDashboard = useCallback((config: AccountConfig) => {
    setAccounts((prev) => {
      const existing = prev.find((a) => a.id === config.id);
      if (existing) {
        return prev.map((a) => (a.id === config.id ? config : a));
      }
      return [...prev, config];
    });
    setCurrentAccountConfig(config);
    setState("matrix_dashboard");
  }, []);

  const handleAddAccount = useCallback(() => {
    setCurrentAccountConfig({
      ...SAMPLE_ACCOUNT_CONFIG,
      id: `ig-${Date.now()}`,
      status: "draft",
    });
    setState("empty_suggestion");
  }, []);

  const handleEditAccount = useCallback((id: string) => {
    const acc = accounts.find((a) => a.id === id);
    if (acc) {
      setCurrentAccountConfig(acc);
      setState("chat_canvas_bind");
    }
  }, [accounts]);

  const handleBindAccount = useCallback((id: string) => {
    const acc = accounts.find((a) => a.id === id);
    if (acc) {
      setCurrentAccountConfig(acc);
      setState("chat_canvas_bind");
    }
  }, [accounts]);

  const effectiveState =
    state === "matrix_dashboard" && accounts.length === 0
      ? "empty_suggestion"
      : state;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {effectiveState === "empty_suggestion" && (
        <ChannelsEmptyState
          suggestions={PLATFORM_SUGGESTIONS}
          onSubmit={handleEmptySubmit}
        />
      )}
      {effectiveState === "processing" && <ChannelsProcessingState />}
      {effectiveState === "chat_canvas_bind" && (
        <ChannelsChatCanvasState
          accountConfig={currentAccountConfig}
          onConfirmToDashboard={handleConfirmToDashboard}
        />
      )}
      {effectiveState === "matrix_dashboard" && (
        <ChannelsMatrixDashboard
          accounts={accounts}
          onAddAccount={handleAddAccount}
          onEditAccount={handleEditAccount}
          onBindAccount={handleBindAccount}
        />
      )}
    </div>
  );
}
