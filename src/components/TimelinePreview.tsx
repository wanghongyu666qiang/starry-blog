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
        const hasNarrative = event.context || event.what_did || event.learned;

        return (
          <div key={event.id} className="relative">
            {/* Timeline dot — brand-aware */}
            {isLatest ? (
              /* Current: purple glow + halo */
              <span
                className="absolute -left-[31px] top-0.5 w-3 h-3 rounded-full cursor-pointer"
                onClick={() => hasNarrative && toggle(event.id)}
              >
                <span className="absolute -inset-1.5 rounded-full bg-[#8B7CFF]/15 animate-ping" />
                <span className="absolute -inset-0.5 rounded-full bg-[#8B7CFF]/30 animate-pulse" />
                <span className="absolute inset-0 rounded-full bg-[#8B7CFF] border-2 border-[#8B7CFF]/50" />
              </span>
            ) : (
              /* Past: dim solid dot */
              <span
                className="absolute -left-[31px] top-0.5 w-3 h-3 rounded-full bg-[#5A6A8A] border-2 border-[#5A6A8A]/30 cursor-pointer hover:bg-[#8B7CFF]/50 transition-colors duration-300"
                onClick={() => hasNarrative && toggle(event.id)}
              />
            )}

            {/* Clickable header */}
            <button
              onClick={() => hasNarrative && toggle(event.id)}
              className={`text-left w-full ${hasNarrative ? "cursor-pointer" : "cursor-default"}`}
            >
              <time className="text-sm text-text-tertiary">{event.date}</time>
              <p className="mt-0.5 text-text-primary group-hover:text-text-secondary transition-colors">
                {event.title}
                {hasNarrative && (
                  <span className="ml-1.5 text-xs text-text-tertiary">
                    {isExpanded ? "▾" : "▸"}
                  </span>
                )}
              </p>
            </button>

            {/* Expandable narrative */}
            {hasNarrative && (
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isExpanded ? "max-h-96 mt-2" : "max-h-0"
                }`}
              >
                <div className="text-sm text-text-secondary leading-relaxed space-y-2 pb-1">
                  {event.context && (
                    <div>
                      <span className="font-medium text-text-primary">背景：</span>
                      {event.context}
                    </div>
                  )}
                  {event.what_did && (
                    <div>
                      <span className="font-medium text-text-primary">做了什么：</span>
                      {event.what_did}
                    </div>
                  )}
                  {event.learned && (
                    <div>
                      <span className="font-medium text-text-primary">学到了什么：</span>
                      {event.learned}
                    </div>
                  )}
                </div>
                {event.link && (
                  <Link
                    href={event.link}
                    className="inline-block mt-2 text-xs text-text-tertiary hover:text-text-primary transition-colors"
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
