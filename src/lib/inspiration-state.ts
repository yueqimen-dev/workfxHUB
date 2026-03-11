export type InspirationState =
  | "empty"
  | "inputting"
  | "processing"
  | "chat_canvas"
  | "vault_dashboard";

export interface InspirationAsset {
  id: string;
  type: "hook" | "script" | "visual";
  title: string;
  rawContent: string;
  template: TemplateBlock[];
  tags: string[];
  createdAt: string;
}

export interface TemplateBlock {
  step: string;
  content: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}
