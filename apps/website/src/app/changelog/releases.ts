import { Release } from "@/types/changelog/changelog-types";

export const RELEASES: Release[] = [
  {
    version: "v2.0.1",
    changes: [
      {
        type: "corrigido",
        items: [
          "Bug em que às vezes os servidores do usuário não apareciam corrigido.",
        ],
      },
      {
        type: "melhoria",
        items: [
          "Uma animação de carregamento agora aparece enquanto os servidores do usuário são carregados",
        ],
      },
    ],
  },
  {
    version: "v2.0",
    title: "'Editar Servidores' chegou! 🎉",
    changes: [
      {
        type: "adicionado",
        items: [
          "Comando /editar-servidor, para que o Discly faça pequenas alterações no seu servidor, sem recria-lo do zero.",
          "Disponível para todos os planos, com uso ilimitado",
        ],
      },
    ],
  },
  {
    version: "v1.9.0",
    changes: [
      {
        type: "corrigido",
        items: [
          "Corrigido bug de crash ao exibir a lista de servidores para colocar o bot",
        ],
      },
    ],
  },
];
