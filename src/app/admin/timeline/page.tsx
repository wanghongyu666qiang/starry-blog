"use client";

import { useState, useEffect } from "react";

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: string;
}

export default function AdminTimelinePage() {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin-timeline");
      if (res.ok) {
        setEvents(await res.json());
      }
      setLoading(false);
    }
    load();
  }, []);

  function addEvent() {
    setEvents([
      ...events,
      {
        id: crypto.randomUUID(),
        date: new Date().toISOString().split("T")[0],
        title: "",
        description: "",
        type: "milestone",
      },
    ]);
  }

  function updateEvent(index: number, field: keyof TimelineEvent, value: string) {
    const updated = [...events];
    (updated[index] as Record<string, string>)[field] = value;
    setEvents(updated);
  }

  function removeEvent(index: number) {
    setEvents(events.filter((_, i) => i !== index));
  }

  async function handleSave() {
    setSaving(true);
    const res = await fetch("/api/timeline", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        events.map((e) => ({
          ...e,
          created_at: e.date,
          link: null,
        }))
      ),
    });
    if (res.ok) {
      setMessage("保存成功");
    } else {
      setMessage("保存失败");
    }
    setSaving(false);
    setTimeout(() => setMessage(""), 2000);
  }

  if (loading) return <div className="p-8 text-text-secondary">加载中…</div>;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-text-primary">时间线管理</h1>
        <div className="flex items-center gap-3">
          {message && <span className="text-sm text-text-secondary">{message}</span>}
          <button
            onClick={addEvent}
            className="px-4 py-2 text-sm font-medium bg-text-primary text-text-inverse hover:bg-text-secondary transition-colors"
          >
            添加事件
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={event.id} className="p-4 border border-border bg-surface">
            <div className="grid sm:grid-cols-4 gap-3">
              <input
                value={event.date}
                onChange={(e) => updateEvent(index, "date", e.target.value)}
                type="date"
                className="px-3 py-2 border border-border text-sm focus:outline-none focus:border-text-primary"
              />
              <input
                value={event.title}
                onChange={(e) => updateEvent(index, "title", e.target.value)}
                placeholder="标题"
                className="px-3 py-2 border border-border text-sm focus:outline-none focus:border-text-primary"
              />
              <select
                value={event.type}
                onChange={(e) => updateEvent(index, "type", e.target.value)}
                className="px-3 py-2 border border-border text-sm focus:outline-none focus:border-text-primary"
              >
                <option value="milestone">里程碑</option>
                <option value="project">项目</option>
                <option value="article">文章</option>
                <option value="award">获奖</option>
                <option value="internship">实习</option>
              </select>
              <div className="flex items-center gap-2">
                <input
                  value={event.description}
                  onChange={(e) => updateEvent(index, "description", e.target.value)}
                  placeholder="描述（可选）"
                  className="flex-1 px-3 py-2 border border-border text-sm focus:outline-none focus:border-text-primary"
                />
                <button
                  onClick={() => removeEvent(index)}
                  className="shrink-0 px-2 py-2 text-sm text-red-600 hover:bg-red-50 border border-red-200 transition-colors"
                >
                  删除
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 text-sm font-medium bg-text-primary text-text-inverse hover:bg-text-secondary transition-colors disabled:opacity-50"
        >
          {saving ? "保存中…" : "保存时间线"}
        </button>
      </div>
    </div>
  );
}
