import { LogOut } from "lucide-react";
import { signOutAction } from "./actions";

export default function SignOutForm({ onClose }: { onClose: () => void }) {
  return (
    <form action={signOutAction} className="w-full">
      <button
        type="submit"
        onClick={onClose}
        className="flex items-center gap-3 px-3 py-2.5 hover:cursor-pointer rounded-xl w-full text-base-content/70 border border-transparent hover:bg-error/10 hover:text-error hover:border-error/20 transition-colors duration-200"
      >
        <LogOut className="w-4 h-4 shrink-0" />
        Sign Out
      </button>
    </form>
  );
}
