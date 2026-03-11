import type { Metadata } from "next";
import { LeftSidebar } from "@/components/layout/LeftSidebar";
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
      <body className="flex min-h-screen flex-row">
        <LeftSidebar />
        <div className="flex min-h-screen flex-1 flex-col overflow-auto">
          <TopTabs />
          <main className="flex-1 bg-white">{children}</main>
        </div>
      </body>
    </html>
  );
}
