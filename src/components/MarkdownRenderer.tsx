"use client";

import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import "katex/dist/katex.min.css";
import "highlight.js/styles/github.css";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    async function renderMermaid() {
      const mermaid = (await import("mermaid")).default;
      if (cancelled || !mermaidRef.current) return;
      mermaid.initialize({ startOnLoad: false, theme: "neutral" });
      const blocks = mermaidRef.current?.querySelectorAll(".mermaid");
      if (blocks && blocks.length > 0) {
        await mermaid.run({ nodes: Array.from(blocks) as HTMLElement[] });
      }
    }
    renderMermaid();
    return () => { cancelled = true; };
  }, [content]);

  return (
    <div ref={mermaidRef}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeHighlight]}
        components={{
          pre: ({ children, ...props }) => (
            <pre className="overflow-x-auto border border-border bg-bg-alt p-4 text-sm my-6" {...props}>
              {children}
            </pre>
          ),
          code: ({ className, children, ...props }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="px-1.5 py-0.5 text-sm bg-bg-alt border border-border" {...props}>
                  {children}
                </code>
              );
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          h1: ({ children, ...props }) => (
            <h1 className="text-3xl font-semibold text-text-primary mt-16 mb-6" {...props}>{children}</h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 className="text-xl font-semibold text-text-primary mt-12 mb-4" {...props}>{children}</h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className="text-lg font-medium text-text-primary mt-8 mb-3" {...props}>{children}</h3>
          ),
          p: ({ children, ...props }) => (
            <p className="text-text-secondary leading-relaxed my-4" {...props}>{children}</p>
          ),
          a: ({ children, href, ...props }) => (
            <a href={href} className="text-text-primary underline underline-offset-2 decoration-border hover:decoration-text-primary transition-colors" {...props}>
              {children}
            </a>
          ),
          ul: ({ children, ...props }) => (
            <ul className="list-disc pl-6 my-4 space-y-1 text-text-secondary" {...props}>{children}</ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="list-decimal pl-6 my-4 space-y-1 text-text-secondary" {...props}>{children}</ol>
          ),
          li: ({ children, ...props }) => (
            <li className="leading-relaxed" {...props}>{children}</li>
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote className="border-l-2 border-border pl-4 my-4 text-text-tertiary italic" {...props}>{children}</blockquote>
          ),
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border-collapse" {...props}>{children}</table>
            </div>
          ),
          th: ({ children, ...props }) => (
            <th className="border border-border px-3 py-2 text-left font-medium text-text-primary bg-bg-alt" {...props}>{children}</th>
          ),
          td: ({ children, ...props }) => (
            <td className="border border-border px-3 py-2 text-text-secondary" {...props}>{children}</td>
          ),
          hr: (props) => (
            <hr className="border-border my-8" {...props} />
          ),
          img: ({ src, alt, ...props }) => (
            <img
              src={src}
              alt={alt || ""}
              className="max-w-full my-6"
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
