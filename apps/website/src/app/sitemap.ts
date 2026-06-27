import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { config } from "@/config/config";

async function getLastModifiedDate(filePath: string): Promise<Date> {
  filePath = path.join(process.cwd(), filePath);
  const stats = await fs.promises.stat(filePath);
  return stats.mtime;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pageRoutes = [
    "",
    "privacy",
    "terms",
    "changelog",
  ];

  const staticRoutes = await Promise.all(
    pageRoutes.map(async (pageRoute) => {
      const lastModified = await getLastModifiedDate(
        `src/app/${pageRoute}/page.tsx`,
      );

      const page = pageRoute.replace(/\/?\(.*?\)/g, "").replace(/^\/+/, "");

      return {
        url: `${config.baseUrl}/${page}`,
        lastModified,
      };
    }),
  );

  const sitemap = [...staticRoutes];

  return sitemap;
}
