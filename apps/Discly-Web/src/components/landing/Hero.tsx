import Navbar from "./Navbar";
import Squares from "@/blocks/backgrounds/Squares/Squares";
import { IconSparkles } from "@tabler/icons-react";
import Image from "next/image";
import PurchaseModalTrigger from "./PurchaseModalTrigger";

export default function Hero() {
  return (
    <header className="w-full min-h-screen flex flex-col relative bg-transparent">
      {/* Background squares */}
      <div className="absolute inset-0 z-10 w-full h-full" aria-hidden="true">
        <Squares
          speed={0.1}
          squareSize={40}
          direction="down"
          borderColor="#5865f2"
          hoverFillColor="ffffff"
        />
      </div>

      {/* Navbar always at the top, not absolutely positioned */}
      <div className="relative z-[2000]">
        <Navbar />
      </div>

      {/* Main content: flex-1, never behind navbar, adapts to any screen size */}
      <div className="flex-1 flex flex-col items-center w-full px-2 sm:px-6 lg:px-8 z-20 pointer-events-none pt-44 sm:pt-56">
        <div className="flex flex-1 flex-col items-center w-full md:pt-0 justify-start md:justify-center">
          <section className="w-full max-w-5xl flex flex-col items-center justify-center text-center pointer-events-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-200 leading-tight">
              O bot que configura seu servidor, em segundos
            </h1>

            <p className="mt-5 text-gray-300 max-w-2xl text-center mx-auto text-sm sm:text-base lg:text-lg px-4">
              Crie do zero ou edite seu servidor do Discord com o poder da IA,
              usando esse bot. Cargos, canais, permissões, e mais, configurados
              automaticamente para você.
            </p>

            <div className="mt-6 sm:mt-8 lg:mt-10">
              <PurchaseModalTrigger
                planId="complete"
                planName="Ilimitado"
                className="bg-gradient-to-r from-primary to-blue-700 hover:brightness-90 active:scale-95 h-12 sm:h-14 w-auto sm:min-w-md px-4 sm:px-6 text-sm sm:text-base lg:text-lg flex items-center gap-2 justify-center"
              >
                <IconSparkles
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  aria-hidden="true"
                />
                Configurar meu servidor agora
              </PurchaseModalTrigger>
            </div>

            <aside className="flex flex-col sm:flex-row mx-auto mt-3 items-center justify-center gap-2 sm:gap-0">
              <div
                className="flex flex-row"
                role="group"
                aria-label="Avatares de clientes"
              >
                <Image
                  src="/avatar1.webp"
                  className="rounded-full border-1 border-primary"
                  alt="Avatar 1"
                  width={35}
                  height={35}
                />
                <Image
                  src="/avatar2.webp"
                  className="rounded-full border-1 border-primary transform -translate-x-4 translate-y-[0.05em]"
                  alt="Avatar 2"
                  width={35}
                  height={35}
                />
              </div>

              <p className="text-white/50 text-xs sm:text-sm">
                20+ donos de servidores gostaram
              </p>
            </aside>

            <div className="flex flex-row mx-auto mt-8 sm:mt-12 lg:mt-20 items-center justify-center w-full relative">
              {/*
                Use an intrinsic aspect-ratio container so the video remains in
                the document flow and naturally pushes content below it.
                We also clamp max-height on very small screens to avoid the
                iframe becoming taller than the viewport and overlapping next
                sections.
              */}
              <div className="w-full max-w-5xl bg-white/10 rounded-lg p-2 sm:p-4 overflow-hidden">
                <div className="w-full aspect-video sm:aspect-[16/9] rounded-md overflow-hidden max-h-[60vh] sm:max-h-[50vh]">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/Ik9YN68QV3g?si=wshLO18Qw3Qh-wDw"
                    title="Showcase do Discly"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="w-full h-full rounded-md"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </header>
  );
}
