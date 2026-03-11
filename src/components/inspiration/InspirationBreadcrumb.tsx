interface InspirationBreadcrumbProps {
  showSearch?: boolean;
}

export function InspirationBreadcrumb({ showSearch }: InspirationBreadcrumbProps) {
  return (
    <div className="flex shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
      <p className="text-sm text-gray-500">
        <span className="text-black">品牌营销大脑</span>
        <span className="mx-2">›</span>
        <span>营销灵感库 (Marketing Vault)</span>
      </p>
      {showSearch && (
        <input
          type="text"
          placeholder="🔍 搜索..."
          className="w-48 rounded-md border-2 border-gray-300 px-3 py-1.5 text-sm text-black outline-none placeholder:text-gray-400 focus:border-black"
        />
      )}
    </div>
  );
}
