import { Code2 } from "lucide-react";

type AuthHeaderProps = {
  headingText: string;
  paragraphText: string;
};

export default function AuthHeader({
  headingText,
  paragraphText,
}: AuthHeaderProps) {
  return (
    <div className="space-y-2 text-center">
      <div className="flex items-center justify-center">
        <Code2 className="h-10 w-10" />
      </div>
      <h1 className="text-2xl font-semibold tracking-tight">{headingText}</h1>
      <p className="text-sm">{paragraphText}</p>
    </div>
  );
}
