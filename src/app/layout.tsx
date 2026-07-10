import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DrukBiz OS — Business Operating System for Bhutan",
  description: "Know your real profit every day. Simple sales, inventory, and customer management for Bhutanese businesses.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-background antialiased">{children}</body>
    </html>
  );
}
