export type NoteType =
  | "adicionado"
  | "novo"
  | "aprimorado"
  | "melhoria"
  | "corrigido"
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
