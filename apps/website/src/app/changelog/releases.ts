import { Release } from "@/types/changelog/changelog-types";

export const RELEASES: Release[] = [
  {
    version: "v2.0.1",
    changes: [
      {
        type: "fixed",
        items: [
          "Fixed a bug where user servers sometimes wouldn't appear.",
        ],
      },
      {
        type: "improvement",
        items: [
          "A loading animation now shows while user servers are loading",
        ],
      },
    ],
  },
  {
    version: "v2.0",
    title: "'Edit Servers' is here! 🎉",
    changes: [
      {
        type: "added",
        items: [
          "Command /edit-server, so Discly can make small changes to your server without recreating it from scratch.",
          "Available on all plans, with unlimited usage",
        ],
      },
    ],
  },
  {
    version: "v1.9.0",
    changes: [
      {
        type: "fixed",
        items: [
          "Fixed a crash bug when displaying the server list to add the bot",
        ],
      },
    ],
  },
];
