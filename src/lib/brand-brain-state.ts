export type BrandBrainState =
  | "empty"
  | "inputting"
  | "processing"
  | "chat_canvas"
  | "chat_canvas_4_1"
  | "chat_canvas_4_3"
  | "chat_canvas_4_5"
  | "saved_preview";

export type ChatCanvasVariant = "default" | "4.1" | "4.3" | "4.5";

export interface UploadedItem {
  id: string;
  type: "file" | "image" | "text" | "link";
  name: string;
  size?: string;
  preview?: string;
}

export interface BrandArchive {
  id: string;
  name: string;
  updatedAt: string;
  sections: BrandSection[];
}

export interface BrandSection {
  id: string;
  title: string;
  content: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  quotedText?: string;
}
