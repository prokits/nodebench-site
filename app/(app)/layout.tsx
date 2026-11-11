import type { Metadata } from "next";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: {
    default: "nodebench.com",
    template: "%s | nodebench",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="bg-brand_orange text-white mb-14">
        <Navbar />
      </header>
      {children}
      <Toaster />
      <footer className="bg-brand_orange text-white px-6 py-12 pb-2 border-t-8 border-red-300 dark:bg-brand_orange-dark dark:border-brand_orange">
        <Footer />
      </footer>
    </>
  );
}
