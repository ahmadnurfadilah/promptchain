import Navbar from "../components/ui/navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Loading from "../components/ui/loading";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PromptChain",
  description: "Discover, Trade, and Monetize Your Prompts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased bg-slate-50 text-dark ${inter.className}`}>
        <Loading />
        <Navbar />
        <main className="w-full min-h-[100vh_-_4rem]">
          {children}
        </main>

        <Toaster />
      </body>
    </html>
  );
}
