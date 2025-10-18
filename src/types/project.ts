
export type Project = {
  id: string;
  name: string;
  description: string;
  updatedAt: string; // ISO string
};


export type GitHubRepo = {
  name: string;
  full_name: string;
  description: string | null;
  archived: boolean;
  private: boolean;
  updated_at: string;
  link: string;
};

export type Commit = {
  id: string;
  message: string;
  author: string;
  committedAt: string; // ISO string
  hash: string;
  // optional status to color timeline nodes, e.g., success/failure
  status?: "success" | "warning" | "error" | "processing" | "default";
};


export type Branch = {
  id: string;
  name: string;
};