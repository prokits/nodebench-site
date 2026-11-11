import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { CSPostHogProvider } from "./providers";
import { themeInitScript } from "@/lib/theme";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "nodebench",
  description: "Real Performance, Real Results",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The theme script adds the `dark` class before React hydrates.
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <CSPostHogProvider>
        <body className={`${poppins.variable} antialiased`}>{children}</body>
      </CSPostHogProvider>
    </html>
  );
}
