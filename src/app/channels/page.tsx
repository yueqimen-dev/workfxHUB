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

const CHANNELS_STATES: { id: ChannelsState; label: string }[] = [
  { id: "empty_suggestion", label: "空状态" },
  { id: "processing", label: "处理中" },
  { id: "chat_canvas_bind", label: "矩阵搭建" },
  { id: "matrix_dashboard", label: "矩阵仪表盘" },
];

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

/** 矩阵仪表盘默认展示：多平台，每平台 1～2 个账号 */
const DEFAULT_DASHBOARD_ACCOUNTS: AccountConfig[] = [
  {
    id: "ig-1",
    platform: "instagram",
    handle: "Brand_Official",
    status: "draft",
    positioning: "[账号 01] 官方主号",
    personaTone: "高冷、专业",
    visualSpecs: { toneStyle: "100% 继承 / 极致留白", layoutRules: [] },
    brandInherits: ["核心受众：25-35岁白领", "违禁词：平替、廉价"],
  },
  {
    id: "ig-2",
    platform: "instagram",
    handle: "Brand_Community",
    status: "bound",
    positioning: "[账号 02] 客服/私域号",
    personaTone: "[变异] 亲和、带互动性",
    visualSpecs: { toneStyle: "继承 / 增加生活化滤镜", layoutRules: [] },
    brandInherits: ["核心受众：25-35岁白领", "违禁词：平替、廉价"],
  },
  {
    id: "tk-1",
    platform: "tiktok",
    handle: "Brand_Story",
    status: "draft",
    positioning: "[账号 01] 官方剧情号",
    personaTone: "[变异] 幽默、反差萌",
    visualSpecs: { toneStyle: "继承 / 工业废土感", layoutRules: [] },
    brandInherits: ["核心受众：25-35岁白领", "违禁词：平替、廉价"],
  },
  {
    id: "tk-2",
    platform: "tiktok",
    handle: "Brand_Behind",
    status: "draft",
    positioning: "[账号 02] 幕后花絮号",
    personaTone: "轻松、真实",
    visualSpecs: { toneStyle: "继承 / 日常感", layoutRules: [] },
    brandInherits: ["核心受众：25-35岁白领", "违禁词：平替、廉价"],
  },
  {
    id: "blog-1",
    platform: "blog",
    handle: undefined,
    status: "draft",
    positioning: "[账号 01] 技术专栏",
    personaTone: "学术、深度",
    visualSpecs: { toneStyle: "继承 / 冷色调配图", layoutRules: [] },
    brandInherits: ["核心受众：25-35岁白领", "违禁词：平替、廉价"],
  },
  {
    id: "x-1",
    platform: "x",
    handle: "Brand_News",
    status: "draft",
    positioning: "[账号 01] 官方资讯",
    personaTone: "简洁、专业",
    visualSpecs: { toneStyle: "继承", layoutRules: [] },
    brandInherits: ["核心受众：25-35岁白领", "违禁词：平替、廉价"],
  },
];

export default function ChannelsPage() {
  const [state, setState] = useState<ChannelsState>("empty_suggestion");
  const [forceDebugState, setForceDebugState] = useState<ChannelsState | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [accounts, setAccounts] = useState<AccountConfig[]>(DEFAULT_DASHBOARD_ACCOUNTS);
  const [currentAccountConfig, setCurrentAccountConfig] =
    useState<AccountConfig>(SAMPLE_ACCOUNT_CONFIG);

  const handleEmptySubmit = useCallback((text: string) => {
    setForceDebugState(null);
    setIsEditMode(false);
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
    setForceDebugState(null);
    setIsEditMode(false);
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

  const handleConfirmMatrix = useCallback((configs: AccountConfig[]) => {
    setForceDebugState(null);
    setIsEditMode(false);
    setAccounts(configs);
    if (configs.length > 0) {
      setCurrentAccountConfig(configs[0]);
    }
    setState("matrix_dashboard");
  }, []);

  const handleAddAccount = useCallback(() => {
    setForceDebugState(null);
    setCurrentAccountConfig({
      ...SAMPLE_ACCOUNT_CONFIG,
      id: `ig-${Date.now()}`,
      status: "draft",
    });
    setState("empty_suggestion");
  }, []);

  const handleEditAccount = useCallback((id: string) => {
    setForceDebugState(null);
    const acc = accounts.find((a) => a.id === id);
    if (acc) {
      setCurrentAccountConfig(acc);
      setIsEditMode(true);
      setState("chat_canvas_bind");
    }
  }, [accounts]);

  const handleBindAccount = useCallback((id: string) => {
    setForceDebugState(null);
    setIsEditMode(false);
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
  const displayState = forceDebugState ?? effectiveState;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="shrink-0 flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-4 py-2">
        <span className="text-xs font-medium text-gray-500">Debug:</span>
        {CHANNELS_STATES.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              setState(id);
              setForceDebugState(id);
            }}
            className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
              displayState === id
                ? "bg-black text-white"
                : "bg-white text-gray-600 hover:bg-gray-200 border border-gray-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      {displayState === "empty_suggestion" && (
        <ChannelsEmptyState
          onSubmit={handleEmptySubmit}
          onStrategyConfirm={() => handleEmptySubmit("策略很好，全按这个来")}
        />
      )}
      {displayState === "processing" && <ChannelsProcessingState />}
      {displayState === "chat_canvas_bind" && (
        <ChannelsChatCanvasState
          accountConfig={currentAccountConfig}
          isEditMode={isEditMode}
          onConfirmToDashboard={handleConfirmToDashboard}
          onConfirmMatrix={handleConfirmMatrix}
        />
      )}
      {displayState === "matrix_dashboard" && (
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
