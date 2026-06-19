"use client";

import { useState } from "react";
import { JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const steps = [
  {
    title: "Invite the bot to your server(s)",
    text: "Just click the blue button on this page. Remember to give the bot administrator permission.",
  },
  {
    title: (
      <>
        Run{" "}
        <code
          className={cn(
            jetbrainsMono.className,
            "bg-base-100 px-1.5 py-0.5 rounded-sm text-sm font-normal",
          )}
        >
          /configure-server
        </code>{" "}
        to set up your server
      </>
    ),
    text: 'Run this comand to start a server from scratch. Make sure to give a precise description to the bot.',
  },
  {
    title: (
      <>
        Run{" "}
        <code
          className={cn(
            jetbrainsMono.className,
            "bg-base-100 px-1.5 py-0.5 rounded-sm text-sm font-normal",
          )}
        >
          /edit-server
        </code>{" "}
        to customize (optional)
      </>
    ),
    text: 'Run this command to only edit specific things in a server that is already created.',
  },
];

function CharReveal({ text }: { text: string }) {
  const words = text.split(/(\s+)/);
  let charIndex = 0;

  return (
    <span>
      {words.map((word, wi) => {
        if (/^\s+$/.test(word)) {
          // return the whitespace as a regular text node (break opportunity)
          return <span key={wi}>{word}</span>;
        }
        // each word is an inline-block so it won't break mid-word
        const chars = word.split("");
        const result = (
          <span key={wi} className="inline-block whitespace-nowrap">
            {chars.map((char) => {
              const idx = charIndex++;
              return (
                <span
                  key={idx}
                  className="inline-block animate-char-reveal"
                  style={{ animationDelay: `${idx * 0.003}s` }}
                >
                  {char}
                </span>
              );
            })}
          </span>
        );
        return result;
      })}
    </span>
  );
}

export default function HowToAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function handleToggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <div className="w-full lg:flex-1">
      <h2 className="text-2xl font-bold text-white mb-6">
        How to use the bot
      </h2>

      {steps.map((step, i) => (
        <div
          key={i}
          className={`collapse collapse-plus bg-base-300 rounded-2xl mb-3 w-full max-w-prose ${openIndex === i ? "collapse-open" : "collapse-close"
            }`}
        >
          <div
            className="collapse-title text-base font-medium text-base-content cursor-pointer select-none"
            onClick={() => handleToggle(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleToggle(i);
              }
            }}
            role="button"
            tabIndex={0}
          >
            {step.title}
          </div>
          <div className="collapse-content text-sm text-base-content/70">
            {openIndex === i && <CharReveal text={step.text} />}
          </div>
        </div>
      ))}
    </div>
  );
}
