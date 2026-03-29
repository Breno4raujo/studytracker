export type Study = {
  id: number;
  title: string;
  done: boolean;
  progress: string;
  lastStudiedAt: string;
  priority?: Priority;
  confidence: number;
  nextReview?: string;
};

export type Priority = "Alta" | "Media" | "Baixa";