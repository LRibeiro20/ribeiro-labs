import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Luis Ribeiro | Full Stack Engineer & AI Developer",
  description: "Portfolio of Luis Ribeiro — Full Stack Engineer & AI Developer specializing in Private AI Cloud infrastructure, MLOps, and production-grade ML pipelines.",
  icons: {
    icon: "/logo.png",
  },
};

import Navbar from "@/components/Layout/Navbar";
import TurnstileWidget from "@/components/UI/TurnstileWidget";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <TurnstileWidget />
      </body>
    </html>
  );
}
