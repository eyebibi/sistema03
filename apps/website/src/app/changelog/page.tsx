import Squares from "@/blocks/backgrounds/Squares/Squares";
import ReleaseCard from "@/components/changelog/ReleaseCard";
import { Button } from "@/components/ui/button";
import { IconArrowLeft, IconReplace } from "@tabler/icons-react";
import { Metadata } from "next";
import Link from "next/link";
import { RELEASES } from "./releases";

export const metadata: Metadata = {
  title: "Notas de atualização",
  description: "Notas de atualização do Discly",
};

export default function Changelog() {
  return (
    <section className="w-full min-h-screen flex flex-col relative overflow-hidden pt-20 pb-20">
      {/* Subtle animated background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Squares
          speed={0.04}
          squareSize={48}
          direction="down"
          borderColor="rgba(88,101,242,0.2)"
          hoverFillColor="rgba(88,101,242,0.06)"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <nav className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="text-gray-300 hover:text-white">
              <IconArrowLeft className="w-4 h-4" />
              <span className="ml-2">Voltar</span>
            </Button>
          </Link>
        </nav>

        <header className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-blue-700 shadow-lg shadow-primary/25 mx-auto">
            <IconReplace className="w-10 h-10 text-white" />
          </div>
          <h1 className="mt-4 text-3xl md:text-4xl font-bold text-gray-200">
            Notas de atualização
          </h1>
          <p className="mt-2 text-gray-400 max-w-2xl mx-auto">
            Histórico público das mudanças, melhorias e correções do Discly. As
            atualizações lançadas estão listadas abaixo.
          </p>
        </header>

        <main className="relative">
          {/* vertical line */}
          <div className="hidden md:block absolute left-6 top-6 bottom-6 w-px bg-primary/30" />

          <div className="space-y-8">
            {RELEASES.map((r) => (
              <ReleaseCard key={r.version} release={r} />
            ))}
          </div>
        </main>

        <footer className="mt-10 text-center text-sm text-gray-400">
          Todas as atualizações têm o intuito de tornar o Discly cada vez melhor
          :)
        </footer>
      </div>

      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80 pointer-events-none z-5"></div>
    </section>
  );
}
