export type ChannelsState =
  | "empty_suggestion"
  | "processing"
  | "chat_canvas_bind"
  | "matrix_dashboard";

export type PlatformType = "instagram" | "tiktok" | "x" | "blog";

export type AccountBindStatus = "bound" | "draft";

export interface PlatformSuggestion {
  platform: PlatformType;
  icon: string;
  label: string;
  description: string;
}

export interface AccountVisualSpec {
  defaultSize?: string;
  toneStyle?: string;
  layoutRules?: string[];
}

export interface AccountConfig {
  id: string;
  platform: PlatformType;
  handle?: string;
  status: AccountBindStatus;
  positioning: string;
  personaTone?: string;
  visualSpecs: AccountVisualSpec;
  brandInherits: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export const PLATFORM_SUGGESTIONS: PlatformSuggestion[] = [
  {
    platform: "instagram",
    icon: "📷",
    label: "Instagram",
    description: "适合展现您的极简视觉与生活方式",
  },
  {
    platform: "tiktok",
    icon: "🎵",
    label: "TikTok",
    description: "适合您的年轻化受众与短视频传播",
  },
  {
    platform: "x",
    icon: "🐦",
    label: "X (Twitter)",
    description: "适合发布行业快讯与互动",
  },
];

export const PLATFORM_LABELS: Record<PlatformType, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  x: "X (Twitter)",
  blog: "官方 Blog",
};

export const PLATFORM_ICONS: Record<PlatformType, string> = {
  instagram: "📷",
  tiktok: "🎵",
  x: "🐦",
  blog: "✍️",
};
