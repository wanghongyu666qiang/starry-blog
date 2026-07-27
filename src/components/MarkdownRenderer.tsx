import {
  isValidElement,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { CopyButton } from "./CopyButton";
import { MermaidBlock } from "./MermaidBlock";
import "katex/dist/katex.min.css";
import "highlight.js/styles/github.css";

function textFromNode(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textFromNode).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return textFromNode(node.props.children);
  }
  return "";
}

function CodeBlock({
  children,
  ...props
}: HTMLAttributes<HTMLPreElement>) {
  const child = isValidElement<{ className?: string; children?: ReactNode }>(
    children,
  )
    ? children
    : null;
  const className = child?.props.className ?? "";
  const code = textFromNode(child?.props.children ?? children).replace(/\n$/, "");

  if (className.includes("language-mermaid")) {
    return <MermaidBlock code={code} />;
  }

  return (
    <div className="group relative my-6">
      <pre
        className="overflow-x-auto border border-border bg-bg-alt p-3 pr-14 text-xs sm:p-4 sm:pr-16 sm:text-sm"
        {...props}
      >
        {children}
      </pre>
      <CopyButton text={code} />
    </div>
  );
}

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[
        rehypeSlug,
        rehypeKatex,
        [rehypeHighlight, { plainText: ["mermaid"] }],
      ]}
      components={{
        pre: CodeBlock,
        code: ({ className, children, ...props }) =>
          className ? (
            <code className={className} {...props}>
              {children}
            </code>
          ) : (
            <code
              className="break-words border border-border bg-bg-alt px-1.5 py-0.5 text-xs sm:text-sm"
              {...props}
            >
              {children}
            </code>
          ),
        h1: ({ children, ...props }) => (
          <h1
            className="mb-4 mt-12 scroll-mt-24 text-2xl font-semibold text-text-primary sm:mb-6 sm:mt-16 sm:text-3xl"
            {...props}
          >
            {children}
          </h1>
        ),
        h2: ({ children, ...props }) => (
          <h2
            className="mb-3 mt-8 scroll-mt-24 text-lg font-semibold text-text-primary sm:mb-4 sm:mt-12 sm:text-xl"
            {...props}
          >
            {children}
          </h2>
        ),
        h3: ({ children, ...props }) => (
          <h3
            className="mb-2 mt-6 scroll-mt-24 text-base font-medium text-text-primary sm:mb-3 sm:mt-8 sm:text-lg"
            {...props}
          >
            {children}
          </h3>
        ),
        p: ({ children, ...props }) => (
          <p
            className="my-4 text-sm leading-relaxed text-text-secondary sm:text-base"
            {...props}
          >
            {children}
          </p>
        ),
        a: ({ children, href, ...props }) => {
          const external = Boolean(href?.startsWith("http"));
          return (
            <a
              href={href}
              className="break-words text-text-primary underline decoration-border underline-offset-2 transition-colors hover:decoration-text-primary"
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              {...props}
            >
              {children}
            </a>
          );
        },
        ul: ({ children, ...props }) => (
          <ul
            className="my-4 list-disc space-y-1.5 pl-5 text-sm text-text-secondary sm:pl-6 sm:text-base"
            {...props}
          >
            {children}
          </ul>
        ),
        ol: ({ children, ...props }) => (
          <ol
            className="my-4 list-decimal space-y-1.5 pl-5 text-sm text-text-secondary sm:pl-6 sm:text-base"
            {...props}
          >
            {children}
          </ol>
        ),
        li: ({ children, ...props }) => (
          <li className="leading-relaxed" {...props}>
            {children}
          </li>
        ),
        blockquote: ({ children, ...props }) => (
          <blockquote
            className="my-4 border-l-2 border-border pl-3 text-sm italic text-text-tertiary sm:pl-4 sm:text-base"
            {...props}
          >
            {children}
          </blockquote>
        ),
        table: ({ children, ...props }) => (
          <div className="-mx-5 my-6 overflow-x-auto sm:mx-0">
            <table
              className="w-full border-collapse text-xs sm:text-sm"
              {...props}
            >
              {children}
            </table>
          </div>
        ),
        th: ({ children, ...props }) => (
          <th
            className="border border-border bg-bg-alt px-2 py-2 text-left font-medium text-text-primary sm:px-3"
            {...props}
          >
            {children}
          </th>
        ),
        td: ({ children, ...props }) => (
          <td
            className="border border-border px-2 py-2 text-text-secondary sm:px-3"
            {...props}
          >
            {children}
          </td>
        ),
        hr: (props) => <hr className="my-8 border-border" {...props} />,
        img: ({ src, alt, ...props }) => (
          // Markdown content is validated at build time; unknown dimensions use
          // native lazy loading to avoid inventing an incorrect aspect ratio.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt ?? ""}
            loading="lazy"
            decoding="async"
            className="my-6 h-auto max-w-full border border-border"
            {...props}
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
