"use client";

import { useState } from "react";
import Link from "next/link";
import type { TimelineEvent } from "@/lib/types";

interface TimelinePreviewProps {
  events: TimelineEvent[];
}

export function TimelinePreview({ events }: TimelinePreviewProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="border-l-2 border-border pl-6 space-y-6">
      {events.map((event, index) => {
        const isLatest = index === 0;
        const isExpanded = expandedId === event.id;
        const hasDetail = event.description && event.description.length > 0;

        return (
          <div key={event.id} className="relative">
            {/* Timeline dot */}
            <span
              className={`absolute -left-[31px] top-0.5 w-3 h-3 border-2 rounded-full transition-colors duration-300 cursor-pointer
                ${isLatest ? "border-text-primary bg-text-primary" : "border-border bg-surface hover:border-text-primary/50"}
              `}
              onClick={() => hasDetail && toggle(event.id)}
            >
              {isLatest && (
                <span className="absolute inset-0 rounded-full bg-text-primary animate-ping opacity-30" />
              )}
            </span>

            {/* Clickable header */}
            <button
              onClick={() => hasDetail && toggle(event.id)}
              className={`text-left w-full ${hasDetail ? "cursor-pointer" : "cursor-default"}`}
            >
              <time className="text-sm text-text-tertiary">{event.date}</time>
              <p className="mt-0.5 text-text-primary group-hover:text-text-secondary transition-colors">
                {event.title}
                {hasDetail && (
                  <span className="ml-1.5 text-xs text-text-tertiary">
                    {isExpanded ? "▾" : "▸"}
                  </span>
                )}
              </p>
            </button>

            {/* Expandable detail */}
            {hasDetail && (
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isExpanded ? "max-h-40 mt-2" : "max-h-0"
                }`}
              >
                <p className="text-sm text-text-secondary leading-relaxed pb-1">
                  {event.description}
                </p>
                {event.link && (
                  <Link
                    href={event.link}
                    className="inline-block mt-1 text-xs text-text-tertiary hover:text-text-primary transition-colors"
                  >
                    查看详情 &rarr;
                  </Link>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
