import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export default async function Layout({ children, params }: Props) {
  const { lang } = await params;

  return (
    <div>
      <header className="flex justify-start items-center p-4">
        <Link href={`/${lang}`} className="btn btn-ghost">
          <ArrowLeft />
          Back
        </Link>
      </header>
      {children}
    </div>
  );
}
