"use client";

import { useEffect, useId, useState } from "react";

export function MermaidBlock({ code }: { code: string }) {
  const reactId = useId();
  const [svg, setSvg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "neutral",
        });
        const id = `mermaid-${reactId.replace(/[^a-zA-Z0-9-]/g, "")}`;
        const result = await mermaid.render(id, code);
        if (!cancelled) setSvg(result.svg);
      } catch {
        if (!cancelled) setError("图表暂时无法渲染，请检查 Mermaid 语法。");
      }
    }

    void render();
    return () => {
      cancelled = true;
    };
  }, [code, reactId]);

  if (error) {
    return (
      <div className="my-6 border border-border bg-bg-alt p-4 text-sm text-text-secondary">
        <p>{error}</p>
        <pre className="mt-3 overflow-x-auto text-xs">{code}</pre>
      </div>
    );
  }

  return (
    <div
      className="my-6 min-h-24 overflow-x-auto border border-border bg-surface p-4 text-center"
      aria-label="Mermaid 图表"
    >
      {svg ? (
        <div dangerouslySetInnerHTML={{ __html: svg }} />
      ) : (
        <span className="text-sm text-text-tertiary">正在渲染图表…</span>
      )}
    </div>
  );
}
