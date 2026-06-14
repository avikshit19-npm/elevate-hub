import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

const headingFont = Syne({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const bodyFont = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ELEVATE HUB | Premium Digital Marketing & Design Agency",
  description: "We scale luxury brands into culture through cutting-edge strategy, artistic creative direction, and high-performance WebGL engineering.",
  keywords: ["digital marketing", "luxury branding", "design agency", "web development", "creative agency", "performance marketing"],
  openGraph: {
    title: "ELEVATE HUB | Premium Digital Marketing & Design Agency",
    description: "We scale luxury brands into culture through cutting-edge strategy, artistic creative direction, and high-performance WebGL engineering.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#ffffff] dark:bg-[#0B0B0B] transition-colors duration-500">
        <CustomCursor />
        <Navbar />
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
