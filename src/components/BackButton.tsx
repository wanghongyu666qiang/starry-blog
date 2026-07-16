import Link from "next/link";

interface BackButtonProps {
  href: string;
  label: string;
}

export function BackButton({ href, label }: BackButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center text-sm text-text-tertiary hover:text-text-primary transition-colors"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="mr-1.5"
      >
        <path
          fillRule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
      {label}
    </Link>
  );
}
