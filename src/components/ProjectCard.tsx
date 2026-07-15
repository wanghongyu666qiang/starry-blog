import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  slug: string;
  role?: string | null;
}

export function ProjectCard({ title, description, techStack, slug, role }: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`} className="group block">
      <article className="p-6 border border-border hover:border-border-hover transition-colors">
        <h3 className="text-base font-medium text-text-primary group-hover:text-text-secondary transition-colors">
          {title}
        </h3>
        <p className="mt-2 text-sm text-text-secondary leading-relaxed line-clamp-2">
          {description}
        </p>
        {role && (
          <p className="mt-2 text-xs text-text-tertiary">
            {role}
          </p>
        )}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="inline-block px-2 py-0.5 text-xs text-text-tertiary bg-bg-alt border border-border rounded"
            >
              {tech}
            </span>
          ))}
        </div>
      </article>
    </Link>
  );
}
