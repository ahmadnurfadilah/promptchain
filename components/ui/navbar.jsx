import Link from "next/link";
import Logo from "../logo/logo";
import ConnectWallet from "./connect-wallet";

export default function Navbar() {
  return (
    <nav className="relative bg-primary top-0 z-20 inset-x-0 w-full h-20 border-b border-lime/10 flex items-center justify-center">
      <div className="container px-4 lg:px-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-8 text-lime hover:text-white" />
          </Link>
        </div>
        <div className="flex items-center gap-14 text-white/60 font-medium">
          <Link href="/prompt" className="hover:text-white">
            Discover
          </Link>
          <Link href="/sell" className="hover:text-white">
            Sell Prompts
          </Link>
          <ConnectWallet />
        </div>
      </div>
    </nav>
  );
}
