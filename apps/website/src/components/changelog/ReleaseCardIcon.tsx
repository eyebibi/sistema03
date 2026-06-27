import { IconReplace } from "@tabler/icons-react";

export default function ReleaseCardIcon() {
  return (
    <div className="sm:flex hidden absolute left-0 md:top-6 -top-4 -ml-5 items-start">
      <div className="w-10 h-10 rounded-box bg-primary/10 flex items-center justify-center text-primary">
        <IconReplace className="w-4 h-4" />
      </div>
    </div>
  );
}
