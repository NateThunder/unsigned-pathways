import type { Metadata } from "next";
import { Caveat, Cormorant_Garamond, IBM_Plex_Mono, Inter } from "next/font/google";
import { SiteHeader } from "../components/SiteHeader";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-display",
});
const bodyMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-body-mono",
});
const editorial = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-editorial",
});
const script = Caveat({
  subsets: ["latin"],
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${bodyMono.variable} ${editorial.variable} ${script.variable}`}>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
