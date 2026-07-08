import Link from "next/link";

interface PostCardProps {
  title: string;
  description: string;
  date: string;
  category?: string;
  slug: string;
}

export function PostCard({ title, description, date, category, slug }: PostCardProps) {
  return (
    <Link href={`/articles/${slug}`} className="group block">
      <article className="py-4 border-b border-border hover:border-border-hover transition-colors">
        <div className="flex items-center gap-3 text-sm text-text-tertiary mb-1.5">
          <time dateTime={date}>{date}</time>
          {category && (
            <>
              <span aria-hidden="true" className="text-border">|</span>
              <span>{category}</span>
            </>
          )}
        </div>
        <h3 className="text-base font-medium text-text-primary group-hover:text-text-secondary transition-colors">
          {title}
        </h3>
        <p className="mt-1 text-sm text-text-secondary leading-relaxed line-clamp-2">
          {description}
        </p>
      </article>
    </Link>
  );
}
