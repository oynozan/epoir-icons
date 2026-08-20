import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CustomizerProvider } from "@/lib/customizer";

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
  title: "Epoir Icons",
  description: "Open-source animated icon library.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <CustomizerProvider>{children}</CustomizerProvider>
      </body>
    </html>
  );
}
