export function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="mx-auto max-w-5xl px-6 py-4 text-sm text-text-tertiary">
        {/* Links row */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <a
            href="https://github.com/wanghongyu666qiang"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-primary transition-colors"
          >
            GitHub
          </a>
          <a
            href="mailto:why17573315302@gmail.com"
            className="hover:text-text-primary transition-colors"
          >
            Email
          </a>
        </div>
        {/* Info row */}
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
          <span>&copy; {new Date().getFullYear()} Starry</span>
          <span>Built with Next.js</span>
        </div>
      </div>
    </footer>
  );
}
