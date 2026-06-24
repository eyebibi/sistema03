import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { config } from "@/config/config";
import { Toaster } from "sonner";
import { cookies } from "next/headers";
import Providers from "./providers";
import { defaultLocale } from "@/i18n/config";

const font = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(config.baseUrl!),
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value || defaultLocale;

  return (
    <html lang={locale}>
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
if(!f._fbq)f._fbq=n;n=n.push=n;n.loaded=!0;n.version='2.0';
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
