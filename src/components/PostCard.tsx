import Link from "next/link";
import { displayCategory } from "@/lib/utils";

interface PostCardProps {
  title: string;
  description: string;
  date: string;
  category?: string;
  slug: string;
  tags?: string[];
  readingTime?: number;
  difficulty?: string;
}

export function PostCard({ title, description, date, category, slug, tags, readingTime, difficulty }: PostCardProps) {
  return (
    <Link href={`/articles/${slug}`} className="group block">
      <article className="py-5 sm:py-4 border-b border-border hover:border-border-hover transition-colors">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-text-tertiary mb-1.5">
          <time dateTime={date}>{date}</time>
          {category && (
            <>
              <span aria-hidden="true">·</span>
              <span>{displayCategory(category)}</span>
            </>
          )}
          {difficulty && (
            <>
              <span aria-hidden="true">·</span>
              <span>{difficulty}</span>
            </>
          )}
          {readingTime != null && (
            <>
              <span aria-hidden="true">·</span>
              <span>{readingTime} min read</span>
            </>
          )}
        </div>
        <h3 className="text-base font-medium text-text-primary group-hover:text-text-secondary transition-colors">
          {title}
        </h3>
        <p className="mt-1 text-sm text-text-secondary leading-relaxed line-clamp-2">
          {description}
        </p>
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="inline-block px-1.5 py-0.5 text-xs text-text-tertiary bg-bg-alt border border-border"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  );
}
