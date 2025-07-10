import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export default function Document() {
  return (
    <Html lang="fa" dir="rtl">
      <Head />
      <body>
        <Main />
        <NextScript />

        {siteKey && (
          <Script
            src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
            strategy="afterInteractive"
          />
        )}
      </body>
    </Html>
  );
}
