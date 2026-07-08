"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex-1 flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-sm text-text-tertiary">500</p>
        <h1 className="mt-2 text-2xl font-semibold text-text-primary">出了点问题</h1>
        <p className="mt-2 text-text-secondary">页面加载时发生了错误。</p>
        <button
          onClick={reset}
          className="mt-6 px-4 py-2 text-sm font-medium border border-border text-text-secondary hover:text-text-primary transition-colors"
        >
          重试
        </button>
      </div>
    </div>
  );
}
