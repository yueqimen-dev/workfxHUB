export type BrandBrainState =
  | "empty"
  | "inputting"
  | "processing"
  | "chat_canvas"
  | "saved_preview";

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
