import { getTimeline } from "@/lib/data";

const TYPE_LABELS: Record<string, string> = {
  project: "项目",
  milestone: "里程碑",
  article: "文章",
  award: "获奖",
  internship: "实习",
};

export default async function TimelinePage() {
  const events = await getTimeline();

  return (
    <div className="mx-auto max-w-3xl px-6 pt-24 pb-24">
      <h1 className="text-3xl font-semibold tracking-tight text-text-primary">时间线</h1>
      <p className="mt-3 text-text-secondary">
        记录有意义的里程碑，而非日常动态。
      </p>

      <div className="mt-12">
        {events.map((event, index) => (
          <div key={event.id} className="relative pl-8 pb-10 last:pb-0">
            {/* Vertical line */}
            {index < events.length - 1 && (
              <div className="absolute left-[11px] top-3 bottom-0 w-px bg-border" />
            )}
            {/* Dot */}
            <div className="absolute left-0 top-1.5 w-[23px] h-[23px] flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-text-primary rounded-full" />
            </div>
            {/* Content */}
            <time className="text-sm text-text-tertiary">{event.date}</time>
            <div className="mt-1 flex items-center gap-2">
              <h3 className="text-base font-medium text-text-primary">{event.title}</h3>
              <span className="shrink-0 px-1.5 py-0.5 text-[10px] text-text-tertiary border border-border">
                {TYPE_LABELS[event.type] || event.type}
              </span>
            </div>
            {event.description && (
              <p className="mt-1.5 text-sm text-text-secondary leading-relaxed">
                {event.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
