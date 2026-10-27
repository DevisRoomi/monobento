export interface User {
  id: string;
  username: string;
  name: string;
  role: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  tech_stack: string[];
  github_url?: string;
  live_url?: string;
  metrics: string;
  featured: boolean;
  col_span: number;
  row_span: number;
  created_at: string;
}

export interface Profile {
  name: string;
  handle: string;
  role: string;
  bio: string;
  location: string;
  timezone: string;
  availability: string;
  avatar_url: string;
  socials: Record<string, string>;
  stats: Record<string, any>;
}

export interface HealthResponse {
  status: string;
  uptime: string;
  go_version: string;
  goroutines: number;
  memory_alloc: string;
  framework: string;
}

export interface Inquiry {
  id?: string;
  name: string;
  email: string;
  message: string;
  created_at?: string;
}
