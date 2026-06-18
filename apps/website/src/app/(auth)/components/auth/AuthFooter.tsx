import Link from "next/link";

type AuthFooterProps = {
  spanText: string;
  linkText: string;
  linkHref: string;
};

export default function AuthFooter({
  linkHref,
  linkText,
  spanText,
}: AuthFooterProps) {
  return (
    <div className="text-center text-sm">
      <span className="text-gray-500">{spanText}</span>
      <Link
        href={linkHref}
        className="font-semibold transition-colors text-gray-400 hover:underline"
      >
        {linkText}
      </Link>
    </div>
  );
}
