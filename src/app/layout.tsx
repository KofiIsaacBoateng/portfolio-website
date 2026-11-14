import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kofi Boateng — Software Engineer",
  description:
    "A portfolio exploring software engineering, infrastructure, and building useful technology.",
};

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const performa = localFont({
  src: [
    {
      path: "./fonts/performa-regular.ttf",
      weight: "400",
    },
    {
      path: "./fonts/performa-medium.ttf",
      weight: "500",
    },
    {
      path: "./fonts/performa-semibold.ttf",
      weight: "600",
    },
    {
      path: "./fonts/performa-bold.ttf",
      weight: "700",
    },
  ],
  variable: "--font-performa",
  display: "swap",
});

const poppins = localFont({
  src: [
    {
      path: "./fonts/poppins-regular.ttf",
      weight: "400",
    },
    {
      path: "./fonts/poppins-medium.ttf",
      weight: "500",
    },
    {
      path: "./fonts/poppins-semibold.ttf",
      weight: "600",
    },
  ],
  variable: "--font-poppins",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-qb-installed
      className={`${performa.variable} ${poppins.variable}`}
    >
      <body className={`${jetBrainsMono.variable}`}>{children}</body>
    </html>
  );
}
