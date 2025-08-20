import type { Metadata } from "next";
import { Providers } from "@/lib/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "FirstPitch",
  description:
    "야구의 세계에 오신 것을 환영합니다. FirstPitch에서 야구를 배워보세요.",
  keywords: ["야구", "baseball", "학습", "교육", "규칙", "퀴즈"],
  authors: [{ name: "FirstPitch Team" }],
  creator: "FirstPitch",
  publisher: "FirstPitch",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://firstpitch.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "FirstPitch - 야구의 세계에 오신 것을 환영합니다",
    description:
      "야구를 쉽고 재미있게 배워보세요. 규칙, 퀴즈, 튜토리얼을 통해 야구에 대한 이해를 높여보세요.",
    url: "https://firstpitch.com",
    siteName: "FirstPitch",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "FirstPitch 로고",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FirstPitch - 야구의 세계에 오신 것을 환영합니다",
    description:
      "야구를 쉽고 재미있게 배워보세요. 규칙, 퀴즈, 튜토리얼을 통해 야구에 대한 이해를 높여보세요.",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/favicon-16x16.png"
          type="image/png"
          sizes="16x16"
        />
        <link
          rel="icon"
          href="/favicon-32x32.png"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className="antialiased font-pretendard"
        suppressHydrationWarning={true}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
