import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { config } from "@/config/config";
import { Toaster } from "sonner";
import Providers from "./providers";

const font = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: config.title,
    template: `%s | ${config.title}`,
  },
  description: config.description,
  keywords: [
    "Servidor Discord com IA Discly",
    "Configurar server do Discord com IA Discly",
    "IA para servidor do Discord",
    "IA para configurar servidor do Discord",
    "Criar servidor do Discord com IA Discly",
  ],
  metadataBase: new URL(config.baseUrl!),
  openGraph: {
    type: "website",
    locale: "pt-BR",
    url: process.env.NEXT_PUBLIC_BASE_URL!,
    title: config.title,
    description: config.description,
    siteName: config.title,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: config.title,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: config.title,
    description: config.description,
    images: ["/opengraph-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <script
          async
          src="https://cdn.seline.com/seline.js"
          data-token="e4d0242a81d0718"
        ></script>

        <script
          dangerouslySetInnerHTML={{
            __html: ` !function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '9834555996672298');
fbq('track', 'PageView'); `,
          }}
        ></script>

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=9834555996672298&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
      <body className={`${font.className} antialiased`}>
        <Providers>
          <Toaster position="top-center" richColors />
          {children}
        </Providers>
      </body>
    </html>
  );
}
