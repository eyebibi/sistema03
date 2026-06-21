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
      <span className="text-base-content/60">{spanText}</span>
      <Link
        href={linkHref}
        className="link link-primary link-hover"
      >
        {linkText}
      </Link>
    </div>
  );
}
