"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-3xl">
          <div className="bg-white/3 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Ocorreu um erro
            </h1>
            <p className="text-gray-300 mb-6">
              Desculpe — algo inesperado aconteceu. Você pode tentar novamente
              ou voltar para a página inicial.
            </p>

            <div className="text-left mb-6">
              <label className="text-sm text-gray-400 block mb-2">
                Detalhes
              </label>
              <pre className="bg-white/5 p-4 rounded-md text-sm text-gray-200 overflow-auto max-h-44">
                {error?.message ?? String(error)}
              </pre>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button onClick={() => reset()} className="rounded-full">
                Tentar novamente
              </Button>
              <Link href="/" className="inline-block">
                <Button variant="outline" className="rounded-full">
                  Ir para a página inicial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
