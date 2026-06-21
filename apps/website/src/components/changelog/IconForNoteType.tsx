import { NoteType } from "@/types/changelog/changelog-types";
import { IconBug, IconSettings, IconSparkles } from "@tabler/icons-react";

interface IconForNoteTypeProps {
  type: NoteType;
}

export default function IconForNoteType({ type }: IconForNoteTypeProps) {
  const size = 16;
  switch (type.toLowerCase() as NoteType) {
    case "added":
    case "new":
      return <IconSparkles size={size} className="text-primary" />;
    case "improved":
    case "improvement":
      return <IconSettings size={size} className="text-primary" />;
    case "fixed":
    case "bug":
    default:
      return <IconBug size={size} className="text-primary" />;
  }
}
