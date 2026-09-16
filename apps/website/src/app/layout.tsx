import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ZantaraEntry } from "../components/ZantaraEntry";
import assistantStyles from "../components/ZantaraEntry.module.css";
import "../styles/brand-fonts.css";
import "./globals.css";

const CONSENT_DEFAULT_SCRIPT =
  "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{'analytics_storage':'denied','ad_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','wait_for_update':500});gtag('consent','update',{'analytics_storage':'granted'});";
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.WEBSITE_PUBLIC_ORIGIN || "https://balizero.com",
  ),
  title: "Bali Zero — Website development",
  description:
    "Immigration, company setup, tax and property guidance in Indonesia.",
  robots: { index: false, follow: false },
  icons: { icon: "/assets/logo.png" },
};
export default function RootLayout({ children }: { children: ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULT_SCRIPT }} />
        {gaId ? (
          <>
            {/* `defer`, not `async`: React 19 hoists async src scripts to the
                front of <head>, which would put gtag.js BEFORE the consent
                default. defer keeps the parallel download and document order. */}
            <script
              defer
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `gtag('js',new Date());gtag('config','${gaId}');`,
              }}
            />
          </>
        ) : null}
      </head>
      <body className={assistantStyles.shell}>
        {children}
        <ZantaraEntry />
      </body>
    </html>
  );
}
