import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { RouteTransitions } from "@/components/motion/RouteTransitions";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CrsQuiz — AI-Assisted Quiz Platform",
  description: "A JSON-driven quiz platform rendered dynamically from MongoDB.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${manrope.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-black text-white relative overflow-x-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 z-[-1] animate-fluid-bg">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-blue-600/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-[500px] h-[500px] bg-indigo-600/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-4000"></div>
        </div>
        <SiteHeader />
        <main className="flex-1 relative z-0">
          <RouteTransitions>{children}</RouteTransitions>
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
