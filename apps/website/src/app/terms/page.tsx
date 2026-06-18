import Squares from "@/blocks/backgrounds/Squares/Squares";
import { Button } from "@/components/ui/button";
import { IconArrowLeft, IconScale } from "@tabler/icons-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Termos de Serviço",
  description: "Termos de Serviço para usar o Discly",
};

export default function TermsOfService() {
  // Replace this with your actual Terms of Service content
  const termsContent = `
**Data de efetivação: 30 de janeiro de 2025**

Bem-vindo ao Discly! Ao usar nossos serviços, você concorda com estes Termos de uso. Por favor, leia-os com atenção.

1. Visão geral

Discly ("nós", "nosso") fornece um bot de Discord com IA para ajudar os usuários a configurar seus servidores rapidamente. Ao acessar ou usar nosso site (https://discly.live) e serviços, você concorda em cumprir estes Termos.

2. Contas de usuário e dados

Para usar nossos serviços, podemos coletar certas informações, incluindo seu e-mail e uma lista de servidores do Discord que você possui. Para mais detalhes, por favor revise nossa Política de privacidade em https://discly.live/privacy.

3. Pagamentos e reembolsos

As compras feitas no Discly são elegíveis para reembolso dentro de 7 dias da compra.

Solicitações de reembolso devem ser enviadas para tim@mail.discly.live diretamente ou via o formulário de contato no site.

Após 7 dias, todas as compras são finais. Ou seja, não será possível solicitar um reembolso.

No entanto, reservamos o direito de negar solicitações de reembolso se suspeitarmos de abuso da nossa política de reembolso.

4. Responsabilidades do usuário

Você deve cumprir todas as leis aplicáveis do Discord.

Você é responsável pelo conteúdo e ações dentro dos seus servidores do Discord.

5. Limitações de responsabilidade

Discly é fornecido "como está" sem garantias de qualquer tipo.

Não somos responsáveis por quaisquer perdas ou danos resultantes do uso de nossos serviços.

6. Lei governante

Estes Termos são governados pelas leis do Brasil. Qualquer disputa será resolvida de acordo com a lei brasileira.

7. Alterações a estes Termos

Podemos atualizar estes Termos de tempos em tempos. Os usuários serão notificados sobre alterações significativas via e-mail.

8. Informações de contato

Para qualquer dúvida, por favor contate-nos em tim@mail.discly.live.

Obrigado por usar o Discly!`;

  return (
    <section className="w-full min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Squares
          speed={0.05}
          squareSize={60}
          direction="diagonal"
          borderColor="rgba(88, 101, 242, 0.3)"
          hoverFillColor="rgba(88, 101, 242, 0.1)"
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <Link href="/">
          <Button variant="ghost" className="text-gray-300 hover:text-white">
            <IconArrowLeft className="w-4 h-4" />
            Voltar para a página inicial
          </Button>
        </Link>
      </nav>

      {/* Main Content */}
      <div className="flex-1 relative z-10 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-blue-700 shadow-lg shadow-primary/25 mb-6">
              <IconScale className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-200 leading-tight mb-4">
              Termos de serviço
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto">
              Por favor, leia estes termos com atenção antes de usar o serviço
            </p>
          </div>

          {/* Content Area */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 sm:p-12 border border-white/10">
            <div className="prose prose-invert prose-lg max-w-none">
              <div
                className="text-gray-300 leading-relaxed space-y-6"
                style={{ whiteSpace: "pre-line" }}
                dangerouslySetInnerHTML={{
                  __html: termsContent
                    .replace(
                      /\*\*(.*?)\*\*/g,
                      '<strong class="text-white font-semibold">$1</strong>'
                    )
                    .replace(
                      /## (.*)/g,
                      '<h2 class="text-2xl font-bold text-white mt-8 mb-4 first:mt-0">$1</h2>'
                    )
                    .replace(
                      /# (.*)/g,
                      '<h1 class="text-3xl font-bold text-white mt-10 mb-6 first:mt-0">$1</h1>'
                    ),
                }}
              />
            </div>
          </div>

          {/* Footer CTA */}
          <div className="text-center mt-12">
            <p className="text-gray-400 mb-6">
              Tem dúvidas sobre estes termos?
            </p>
            <Link href="mailto:tim@mail.discly.live">
              <Button className="bg-gradient-to-r from-primary to-blue-700 hover:brightness-90 active:scale-95 h-12 px-8 text-base font-medium">
                Entre em contato
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80 pointer-events-none z-5"></div>
    </section>
  );
}
