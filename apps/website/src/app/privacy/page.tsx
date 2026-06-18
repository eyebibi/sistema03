import Squares from "@/blocks/backgrounds/Squares/Squares";
import { Button } from "@/components/ui/button";
import { IconArrowLeft, IconShield } from "@tabler/icons-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Política de Privacidade para usar o Discly",
};

export default function PrivacyPolicy() {
  // Replace this with your actual Privacy Policy content
  const privacyContent = `
**Data de efetivação: 30 de janeiro de 2025**

Bem-vindo ao Discly ("nós", "nosso"). Sua privacidade é importante para nós. Esta Política de privacidade explica como coletamos, usamos e protegemos suas informações quando você usa nosso site e serviços.

1. Informações que coletamos

Dados pessoais: coletamos seu endereço de e-mail e informações sobre servidores do Discord que você possui.

Dados não pessoais: não coletamos nenhum dado não pessoal.

2. Finalidade da coleta de dados

Processamos seus dados para:

Processar suas compras.

Entrar em contato com você em relação aos nossos serviços.

Garantir o funcionamento adequado do nosso bot.

3. Compartilhamento de dados

Não compartilhamos seus dados com terceiros.

4. Privacidade de crianças

Não coletamos dados de crianças.

5. Atualizações desta Política

Podemos atualizar esta Política de privacidade de tempos em tempos. Se quaisquer alterações forem feitas, informaremos os usuários via e-mail.

6. Informações de contato

Para resolver qualquer dúvida sobre esta Política de privacidade, por favor contate-nos em tim@mail.discly.live.

Ao usar o Discly, você concorda com os termos desta Política de privacidade.
  `;

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
              <IconShield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-200 leading-tight mb-4">
              Política de privacidade
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto">
              Veja como o Discly trata seus dados.
            </p>
          </div>

          {/* Content Area */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 sm:p-12 border border-white/10">
            <div className="prose prose-invert prose-lg max-w-none">
              <div
                className="text-gray-300 leading-relaxed space-y-6"
                style={{ whiteSpace: "pre-line" }}
                dangerouslySetInnerHTML={{
                  __html: privacyContent
                    .replace(
                      /\*\*(.*?)\*\*/g,
                      '<strong class="text-white font-semibold">$1</strong>'
                    )
                    .replace(
                      /### (.*)/g,
                      '<h3 class="text-xl font-bold text-white mt-6 mb-3">$1</h3>'
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
              Tem dúvidas sobre como seus dados são tratados?
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
