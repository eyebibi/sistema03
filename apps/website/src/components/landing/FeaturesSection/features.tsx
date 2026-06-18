import { Feature } from "@/types/features/features-types";

export const features: Feature[] = [
  {
    id: "ai-powered-discord-bot",
    name: "Servidor configurado com IA",
    title: "Servidor configurado com IA",
    description: (
      <p className="text-white/80 mb-8 leading-relaxed">
        Você não precisa se preocupar com a configuração de cargos, canais,
        permissões ou qualquer outra coisa chata. A IA vai fazer isso para você,
        baseado no que você pedir, através de um bot do Discord simples,{" "}
        <b>
          criando seu servidor do zero ou atualizando coisas em seu servidor já
          existente
        </b>
        .
      </p>
    ),
    features: [
      "Cargos, canais, permissões e permissões específicas de canal criadas automaticamente",
      "Servidor personalizado para suas necessidades",
      "Nenhuma experiência com Discord necessária",
    ],
    imagePath: "/feature1.png",
  },
  {
    id: "usage-guide",
    name: "Tutorial de uso",
    title: "Nenhuma experiência com Discord necessária",
    description:
      "Se você não é um expert em Discord, não se preocupe. No seu painel, você vai encontrar um tutorial completo sobre como adicionar o bot ao seu servidor e como usá-lo.",
    features: [
      "Como adicionar o bot ao seu servidor",
      "Como usar o bot",
      "Como tirar o máximo de proveito do bot",
    ],
    imagePath: "/feature2.png",
  },
  {
    id: "infinite-customization",
    name: "Modificação ilimitada",
    title: "Seu servidor, suas regras",
    description:
      "Como o bot usa IA, não é garantido que ele sempre vai funcionar da forma exata que você gostaria. Sabendo disso, você pode solicitar ao bot para fazer alterações quantas vezes quiser, com qualquer um dos planos.",
    features: [
      "Alterações ilimitadas, quantas vezes quiser",
      "Sem custos extras",
    ],
    imagePath: "/feature3.png",
  },
  {
    id: "support",
    name: "Suporte 24h/7d",
    title: "Aqui para te ajudar",
    description:
      "Caso algo dê errado (o que é muito raro), você pode sempre entrar em contato com o suporte. Há um formulário de contato no seu painel. Ou você pode enviar uma mensagem para tim@mail.discly.live.",
    features: [
      "Formulário de contato no seu painel",
      "Suporte 24h/7d",
      "Sem custos extras",
      "Resposta rápida",
    ],
    imagePath: "/feature4.png",
  },
];
