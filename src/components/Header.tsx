import Link from "next/link";

const NAV_ITEMS = [
  { href: "/", label: "首页" },
  { href: "/articles", label: "文章" },
  { href: "/projects", label: "项目" },
  { href: "/timeline", label: "时间线" },
  { href: "/about", label: "关于" },
  { href: "/resume", label: "简历" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-bg/80 backdrop-blur-sm border-b border-border">
      <nav className="mx-auto max-w-5xl flex flex-col md:flex-row md:items-center md:justify-between py-3 md:py-0 md:h-14 px-6 gap-2 md:gap-0" aria-label="主导航">
        <Link
          href="/"
          className="text-text-primary font-medium tracking-tight"
        >
          Starry
        </Link>
        <ul className="flex flex-wrap items-center gap-1 md:gap-0.5">
          {NAV_ITEMS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="px-2 md:px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors rounded-md"
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="https://github.com/wanghongyu666qiang"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 md:px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors rounded-md"
              aria-label="GitHub 主页（外部链接）"
            >
              GitHub
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
