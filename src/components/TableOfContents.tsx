import type { TocHeading } from "@/lib/types";

function TocLinks({ headings }: { headings: TocHeading[] }) {
  return (
    <ol className="space-y-2 text-sm">
      {headings.map((heading) => (
        <li key={heading.id} className={heading.level === 3 ? "pl-3" : ""}>
          <a
            href={`#${heading.id}`}
            className="text-text-tertiary transition-colors hover:text-text-primary"
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

export function TableOfContents({ headings }: { headings: TocHeading[] }) {
  if (headings.length < 2) return null;

  return (
    <>
      <details className="mb-10 border border-border bg-surface p-4 lg:hidden">
        <summary className="cursor-pointer text-sm font-medium text-text-primary">
          本文目录
        </summary>
        <div className="mt-4 border-t border-border pt-4">
          <TocLinks headings={headings} />
        </div>
      </details>
      <aside className="hidden w-52 shrink-0 lg:block" aria-label="文章目录">
        <div className="sticky top-24">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-tertiary">
            本文目录
          </p>
          <TocLinks headings={headings} />
        </div>
      </aside>
    </>
  );
}
