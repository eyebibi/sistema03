import { NoteType } from "@/types/changelog/changelog-types";
import { IconBug, IconSettings, IconSparkles } from "@tabler/icons-react";

interface IconForNoteTypeProps {
  type: NoteType;
}

export default function IconForNoteType({ type }: IconForNoteTypeProps) {
  const size = 16;
  switch (type.toLowerCase() as NoteType) {
    case "adicionado":
    case "novo":
      return <IconSparkles size={size} className="text-primary" />;
    case "aprimorado":
    case "melhoria":
      return <IconSettings size={size} className="text-primary" />;
    case "corrigido":
    case "bug":
    default:
      return <IconBug size={size} className="text-primary" />;
  }
}
