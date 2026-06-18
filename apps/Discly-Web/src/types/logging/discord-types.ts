export enum EmbedColors {
  SUCCESS = 5763719,
}

type DiscordEmbedFooter = {
  text: string;
  icon_url?: string;
  proxy_icon_url?: string;
};

type DiscordEmbedImage = {
  url: string;
  proxy_url?: string;
  height?: number;
  width?: number;
};

type DiscordEmbedThumbnail = {
  url: string;
  proxy_url?: string;
  height?: number;
  width?: number;
};

export type DiscordEmbed = {
  title?: string;
  type?: "rich";
  description?: string;
  url?: string;
  timestamp?: string;
  color?: number;
  footer?: DiscordEmbedFooter;
  image?: DiscordEmbedImage;
  thumbnail?: DiscordEmbedThumbnail;
};
