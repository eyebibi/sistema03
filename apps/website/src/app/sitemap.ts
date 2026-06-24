import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { config } from "@/config/config";
import { locales } from "@/i18n/config";

async function getLastModifiedDate(filePath: string): Promise<Date> {
  filePath = path.join(process.cwd(), filePath);
  const stats = await fs.promises.stat(filePath);
  return stats.mtime;
}

const pagePaths = ["", "privacy", "terms", "changelog"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    const pageEntries = await Promise.all(
      pagePaths.map(async (pagePath) => {
        const sourcePath = pagePath
          ? `src/app/[lang]/${pagePath}/page.tsx`
          : `src/app/[lang]/page.tsx`;
        const lastModified = await getLastModifiedDate(sourcePath);
        const url = pagePath
          ? `${config.baseUrl}/${locale}/${pagePath}`
          : `${config.baseUrl}/${locale}`;

        const languages: Record<string, string> = Object.fromEntries(
          locales.map((l) => [
            l,
            pagePath
              ? `${config.baseUrl}/${l}/${pagePath}`
              : `${config.baseUrl}/${l}`,
          ]),
        )
        languages['x-default'] = `${config.baseUrl}/en-US${pagePath ? `/${pagePath}` : ''}`

        return {
          url,
          lastModified,
          alternates: { languages },
        };
      }),
    );

    entries.push(...pageEntries);
  }

  return entries;
}
