"use client";

import { useState, useEffect, useCallback } from "react";
import { JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { Bot } from "lucide-react";
import StepCard from "./components/StepCard";
import OnboardingHint from "./components/OnboardingHint";

const STORAGE_KEY = "discly-checklist";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const steps = [
  {
    id: "step-invite",
    title: (
      <>
        Invite the bot to your server(s)
      </>
    ),
    text: "Just click the blue button on this page. Remember to give the bot administrator permission. After this, you can run the commands in the items below.",
    actions: (
      <a
        href="https://discord.com/oauth2/authorize?client_id=1332423617761509398&permissions=8&integration_type=0&scope=bot"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary btn-sm"
      >
        <Bot className="w-4 h-4" />
        Invite Discly
      </a>
    ),
  },
  {
    id: "step-configure",
    title: (
      <>
        Run{" "}
        <code
          className={cn(
            jetbrainsMono.className,
            "bg-[#2A2D35] px-1.5 py-0.5 rounded-sm text-sm font-normal",
          )}
        >
          /configure-server
        </code>{" "}
        to set up your server
      </>
    ),
    text: "Run this command to start a server from scratch. Make sure to give a precise description to the bot.",
  },
  {
    id: "step-edit",
    title: (
      <>
        Run{" "}
        <code
          className={cn(
            jetbrainsMono.className,
            "bg-[#2A2D35] px-1.5 py-0.5 rounded-sm text-sm font-normal",
          )}
        >
          /edit-server
        </code>{" "}
        to customize (optional)
      </>
    ),
    text: "Run this command to only edit specific things in a server that is already created.",
  },
];

export default function HowToAccordion() {
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setCompletedSteps(JSON.parse(stored));
      }
    } catch {}
    setHydrated(true);
  }, []);

  const toggleStep = useCallback((id: string) => {
    setCompletedSteps((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">
        How to use the bot
      </h2>

      <div className="flex flex-col gap-3">
        {steps.map((step, i) => {
          const card = (
            <StepCard
              key={step.id}
              title={step.title}
              text={step.text}
              isComplete={!!completedSteps[step.id]}
              onToggle={() => toggleStep(step.id)}
              actions={"actions" in step ? step.actions : undefined}
            />
          );
          if (i === 0) {
            return (
              <div key={step.id} className="relative">
                <div
                  className={`absolute max-[1199px]:hidden -left-[160px] -top-5 transition-opacity duration-300 pointer-events-none ${
                    !completedSteps[step.id] ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <OnboardingHint ready={hydrated && !completedSteps["step-invite"]} />
                </div>
                {card}
              </div>
            );
          }
          return card;
        })}
      </div>
    </div>
  );
}
