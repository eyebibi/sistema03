import { Circle, Check } from "lucide-react";
import type { ReactNode } from "react";

export default function StepCard({
  title,
  text,
  isComplete = false,
  onToggle,
  actions,
}: {
  title: ReactNode;
  text: string;
  isComplete?: boolean;
  onToggle?: () => void;
  actions?: ReactNode;
}) {
  return (
    <div
      className={`flex items-start gap-4 p-5 rounded-lg bg-[#1E2028] transition-all duration-150 ease-in-out ${
        isComplete
          ? "border-2 border-dotted border-green-500"
          : "border-2 border-white/5"
      }`}
    >
      <div
        className="mt-0.5 shrink-0 cursor-pointer"
        onClick={onToggle}
      >
        {isComplete ? (
          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
            <Check className="w-3 h-3 text-white" />
          </div>
        ) : (
          <Circle className="w-5 h-5 text-[#4A4D59]" />
        )}
      </div>
      <div>
        <h3
          className="text-sm font-medium text-white mb-1 cursor-pointer"
          onClick={onToggle}
        >
          {title}
        </h3>
        <p className="text-sm text-[#94A3B8] leading-relaxed">{text}</p>
        {actions && <div className="mt-4">{actions}</div>}
      </div>
    </div>
  );
}
