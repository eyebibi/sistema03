import { Release } from "@/types/changelog/changelog-types";
import IconForNoteType from "./IconForNoteType";
import { capitalize } from "@/helpers/capitalize";
import ReleaseCardIcon from "./ReleaseCardIcon";

interface ReleaseCardProps {
  release: Release;
}

export default function ReleaseCard({ release }: ReleaseCardProps) {
  return (
    <div className="relative md:pl-12">
      <ReleaseCardIcon />

      <article className="bg-base-200 border border-base-300/40 rounded-box p-6 md:p-8">
        <header>
          <h3 className="text-lg md:text-xl font-semibold text-base-content">
            {release.version}
          </h3>
          {release.title ? (
            <p className="text-base-content/70 text-sm mt-1">{release.title}</p>
          ) : null}
        </header>

        <div className="mt-4 space-y-4">
          {release.changes.map((group) => (
            <section
              key={group.type}
              aria-labelledby={`${release.version}-${group.type}`}
              className="flex gap-3"
            >
              <div className="flex-shrink-0 mt-1">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-sm bg-base-300/30">
                  <IconForNoteType type={group.type} />
                </span>
              </div>

              <div>
                <h4
                  id={`${release.version}-${group.type}`}
                  className="text-sm font-medium text-base-content/80"
                >
                  {capitalize(group.type)}
                </h4>
                <ul className="mt-2 list-disc list-inside text-base-content/70 text-sm space-y-1">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}
