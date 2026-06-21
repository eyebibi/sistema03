import Link from "next/link";
import { BookOpen, HelpCircle } from "lucide-react";

const links = [
  {
    icon: HelpCircle,
    label: "Frequently Asked Questions",
    href: "/#faq",
  },
  {
    icon: BookOpen,
    label: "Dashboard Guide",
    href: "/dashboard",
  },
];

export default function HelpDeskPanel() {
  return (
    <div>
      <h2 className="font-bold text-xl text-white mb-4">Help & Support</h2>

      <div className="card bg-base-200 card-border">
        <div className="card-body p-6 space-y-5">
          <p className="text-sm text-[#94A3B8] leading-relaxed">
            Before reaching out, check our resources for quick answers to
            common questions.
          </p>

          <div className="space-y-3">
            {links.map((link) => {
              const Icon = link.icon;
              if (link.href.startsWith("/")) {
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-3 text-sm text-[#94A3B8] hover:text-white transition-colors"
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {link.label}
                  </Link>
                );
              }
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-3 text-sm text-[#94A3B8] hover:text-white transition-colors"
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/5">
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              Prefer direct message? Fill out our contact form. Our team typically
              replies to support tickets via email within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
