"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/Button";

interface MultiModalInputBarProps {
  placeholder?: string;
  submitLabel?: string;
  onSubmit: (text: string) => void;
  onFileUpload?: (file: File) => void;
  /** 主按钮（如「立即解析」），优先于 submitLabel。参数为当前输入（可选） */
  primaryLabel?: string;
  onPrimaryClick?: (currentInput?: string) => void;
  /** 受控模式 */
  value?: string;
  onChange?: (v: string) => void;
  disabled?: boolean;
  className?: string;
  /** 紧凑布局（chat 侧边栏用） */
  compact?: boolean;
}

export function MultiModalInputBar({
  placeholder = "请输入...",
  submitLabel = "发送",
  onSubmit,
  onFileUpload,
  primaryLabel,
  onPrimaryClick,
  value: controlledValue,
  onChange: controlledOnChange,
  disabled = false,
  className = "",
  compact = false,
}: MultiModalInputBarProps) {
  const [internalValue, setInternalValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const isControlled = controlledValue !== undefined && controlledOnChange !== undefined;
  const inputValue = isControlled ? controlledValue : internalValue;
  const setInputValue = isControlled ? controlledOnChange : setInternalValue;

  const handleSubmit = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !disabled) {
      onSubmit(trimmed);
      if (!isControlled) setInternalValue("");
      else controlledOnChange("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (onFileUpload) onFileUpload(file);
      else console.warn("该场景暂不支持文件上传");
    }
    e.target.value = "";
  };

  const handleVoiceClick = () => {
    setIsRecording((prev) => !prev);
    if (!isRecording) alert("语音输入功能即将上线");
  };

  const baseClass =
    "flex items-center gap-2 rounded-lg border-2 border-gray-300 bg-white p-2 transition-colors focus-within:border-black";
  const disabledClass = disabled ? "opacity-60 pointer-events-none" : "";
  const pad = compact ? "p-1.5" : "p-1.5";

  return (
    <div className={`${baseClass} ${disabledClass} ${className}`}>
      <label
        className={`flex shrink-0 cursor-pointer rounded ${pad} text-gray-400 transition-colors hover:bg-gray-100 hover:text-black`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          className="hidden"
          onChange={handleFileChange}
        />
        <span title="上传文件" className="text-base">
          📎
        </span>
      </label>
      <label
        className={`flex shrink-0 cursor-pointer rounded ${pad} text-gray-400 transition-colors hover:bg-gray-100 hover:text-black`}
      >
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <span title="上传图片" className="text-base">
          🖼️
        </span>
      </label>
      <button
        type="button"
        onClick={handleVoiceClick}
        className={`shrink-0 rounded ${pad} transition-colors hover:bg-gray-100 ${
          isRecording ? "text-black" : "text-gray-400 hover:text-black"
        }`}
        title="语音输入"
      >
        <span className="text-base">🎤</span>
      </button>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className="min-w-0 flex-1 bg-transparent px-2 py-2.5 text-sm text-black outline-none placeholder:text-gray-400 disabled:cursor-not-allowed"
      />
      {primaryLabel && onPrimaryClick ? (
        <Button
          size={compact ? "sm" : "md"}
          onClick={() => onPrimaryClick(inputValue.trim() || undefined)}
        >
          {primaryLabel}
        </Button>
      ) : (
        <Button
          size={compact ? "sm" : "md"}
          onClick={handleSubmit}
          disabled={!inputValue.trim() || disabled}
        >
          {submitLabel}
        </Button>
      )}
    </div>
  );
}
