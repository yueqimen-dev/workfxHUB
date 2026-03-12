import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center gap-6 px-6">
      <h1 className="font-display text-2xl font-bold text-black">页面未找到</h1>
      <p className="text-gray-600">您访问的链接不存在</p>
      <Link
        href="/"
        className="rounded-md bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
      >
        返回首页
      </Link>
    </div>
  );
}
