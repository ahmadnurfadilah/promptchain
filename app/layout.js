import Navbar from "@/components/ui/navbar";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PromptChain",
  description: "Discover, Trade, and Monetize Your Prompts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="w-full min-h-[100vh_-_4rem] text-dark">
          {children}
        </main>
      </body>
    </html>
  );
}
