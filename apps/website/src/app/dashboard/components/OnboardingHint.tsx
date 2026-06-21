export default function OnboardingHint({ ready = false }: { ready?: boolean }) {
  if (!ready) return null;

  return (
    <div className="flex flex-col items-start pointer-events-none">
      <style>{`
        @keyframes drawBody {
          to { stroke-dashoffset: 0; }
        }
        @keyframes drawArrowhead {
          to { stroke-dashoffset: 0; }
        }
        .animate-draw-body {
          stroke-dasharray: 180;
          stroke-dashoffset: 180;
          animation: drawBody 1s ease-out forwards;
        }
        .animate-draw-arrowhead {
          stroke-dasharray: 20;
          stroke-dashoffset: 20;
          animation: drawArrowhead 0.3s ease-out 1s forwards;
        }
      `}</style>
      <span className="text-xs text-[#CBD5E1] -rotate-[5deg] whitespace-nowrap mb-1">
        Check as you complete
      </span>
      <svg width="200" height="70" viewBox="0 0 200 70" fill="none">
        <path
          d="M 8 15 C 50 5, 120 20, 175 32"
          stroke="#CBD5E1"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength="180"
          className="animate-draw-body"
        />
        <path
          d="M 175 32 L 170 23 M 175 32 L 170 40"
          stroke="#CBD5E1"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength="20"
          className="animate-draw-arrowhead"
        />
      </svg>
    </div>
  );
}
