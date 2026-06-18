import Image from "next/image";

interface TestimonialProps {
  personImagePath: string;
  personName: string;
  personRole: string;
  testimonial: string;
}

export default function Testimonial({
  personImagePath,
  personName,
  personRole,
  testimonial,
}: TestimonialProps) {
  return (
    <figure className="bg-gradient-to-br from-background-lighter to-background-light flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 lg:gap-10 max-w-xl p-4 sm:p-6 rounded-lg border border-dashed border-zinc-500 relative hover:border-zinc-400 transition-colors duration-500 w-full">
      <Image
        src={personImagePath}
        alt={`${personName}, ${personRole}`}
        width={50}
        height={50}
        className="rounded-full flex-shrink-0 mx-auto sm:mx-0"
      />
      <div className="flex flex-col gap-2 sm:gap-3 text-gray-200 text-center sm:text-left">
        <blockquote className="text-sm sm:text-base italic leading-relaxed">
          &quot;{testimonial}&quot;
        </blockquote>
        <figcaption className="text-zinc-400 text-xs sm:text-sm">
          <cite>
            - {personName}, {personRole}
          </cite>
        </figcaption>
      </div>
    </figure>
  );
}
