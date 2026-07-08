export function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="mx-auto max-w-5xl flex items-center justify-between h-14 px-6 text-sm text-text-tertiary">
        <span>&copy; {new Date().getFullYear()} Starry</span>
        <span>用心构建</span>
      </div>
    </footer>
  );
}
