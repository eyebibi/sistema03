export type NoteType =
  | "added"
  | "new"
  | "improved"
  | "improvement"
  | "fixed"
  | "bug";

interface Change {
  type: NoteType;
  items: string[];
}

export interface Release {
  version: string;
  title?: string;
  changes: Change[];
}
