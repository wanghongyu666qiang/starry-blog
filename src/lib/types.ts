export interface Post {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  cover: string | null;
  category: string | null;
  tags: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
  reading_time: number;
  difficulty: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  cover: string | null;
  content: string;
  role: string | null;
  tech_stack: string[];
  github_url: string | null;
  demo_url: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  description: string | null;
  date: string;
  type: string;
  link: string | null;
  created_at: string;
  context?: string;
  what_did?: string;
  learned?: string;
}

export interface ProfileSection {
  id: string;
  section: string;
  data: Record<string, unknown>;
  sort_order: number;
  updated_at: string;
}

export interface SiteSetting {
  key: string;
  value: Record<string, unknown>;
  updated_at: string;
}
