export type Theme = "dark" | "light";
export type Page = "intro" | "workspace";
export type WorkspaceView = "source" | "notes" | "instruments";
export type ProposalKind = "note" | "study_set";

export type Source = {
  id: string;
  title: string;
  path: string;
  kind: "article" | "text";
  body: string;
  createdAt: string;
};

export type Note = {
  id: string;
  title: string;
  body: string;
  sourceIds: string[];
  createdAt: string;
};

export type StudySet = {
  id: string;
  title: string;
  sourceIds: string[];
  cards: Array<{ prompt: string; answer: string }>;
  questions: Array<{ prompt: string; options: string[]; answer: number }>;
  createdAt: string;
};

export type AssistantResponse = {
  answer: string;
  citations: Array<{ sourceId: string; label: string; excerpt: string }>;
  proposal: {
    kind: ProposalKind;
    title: string;
    body: string;
  };
};

export type PersistedState = {
  theme: Theme;
  sources: Source[];
  notes: Note[];
  studySets: StudySet[];
};
