export type Commit = {
  id: string;
  message: string;
  author: string;
  committedAt: string; // ISO string
  hash: string;
  // optional status to color timeline nodes, e.g., success/failure
  status?: "success" | "warning" | "error" | "processing" | "default";
};


