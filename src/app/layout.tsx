import type { Metadata } from "next";
import { TopTabs } from "@/components/navigation/TopTabs";
import "./globals.css";

export const metadata: Metadata = {
  title: "WorkfxHUB",
  description: "品牌大脑 | 渠道账号 | 营销灵感库",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="flex min-h-screen flex-col">
        <TopTabs />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
