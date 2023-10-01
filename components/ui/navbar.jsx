import Link from "next/link";
import Logo from "../logo/logo";
import LogoFLow from "../logo/logo-flow";

export default function Navbar() {
  return (
    <nav className="relative bg-primary top-0 z-20 inset-x-0 w-full h-20 border-b border-lime/10 flex items-center justify-center">
      <div className="container px-4 lg:px-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <a href="/" className="flex items-center gap-2">
            <Logo className="h-8 text-lime hover:text-white" />
          </a>
        </div>
        <div className="flex items-center gap-14 text-white/60 font-medium">
					<Link href="/discover" className="hover:text-white">
						Discover
					</Link>
					<Link href="/sell" className="hover:text-white">
						Sell Prompts
					</Link>
          <button className="flex items-center gap-2 font-bold text-sm text-primary-800 bg-lime px-6 py-3 rounded-md hover:shadow-lg hover:shadow-lime/20 hover:-translate-y-px transition-all hover:contrast-125 cursor-pointer">
            <LogoFLow />
            <span>Connect Wallet</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
