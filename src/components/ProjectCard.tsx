"use client";

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
      <article
        className="relative p-6 border border-border bg-surface
          transition-all duration-300 ease-out
          hover:scale-[1.01] hover:border-text-primary/30 hover:shadow-lg hover:shadow-neutral-900/5"
      >
        {/* Subtle gradient overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(200,200,200,0.06), transparent 40%)",
          }}
        />

        <div className="relative z-10">
          <h3 className="text-base font-medium text-text-primary group-hover:text-text-secondary transition-colors duration-200">
            {title}
          </h3>
          <p className="mt-2 text-sm text-text-secondary leading-relaxed line-clamp-2">
            {description}
          </p>
          {role && (
            <p className="mt-2 text-xs text-text-tertiary">{role}</p>
          )}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {techStack.map((tech, i) => (
              <span
                key={tech}
                className="inline-block px-2 py-0.5 text-xs text-text-tertiary bg-bg-alt border border-border rounded
                  transition-all duration-200 ease-out
                  group-hover:bg-text-primary/5 group-hover:border-text-primary/20 group-hover:text-text-secondary
                  group-hover:-translate-y-0.5"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
