import type { Metadata } from "next";
import { Caveat, Cormorant_Garamond, Inter } from "next/font/google";
import { SiteHeader } from "../components/SiteHeader";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
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
      <body className={`${inter.className} ${editorial.variable} ${script.variable}`}>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
