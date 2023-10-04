import { Button } from "../components/ui/button";
import { Coins, ListChecksIcon, SearchCheckIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="bg-primary-800">
        <div className="container px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            <div className="pt-16 md:pt-0 pr-10 space-y-6">
              <div className="relative">
                <h1 className="relative text-4xl lg:text-5xl font-black leading-normal lg:leading-normal text-white">
                  Discover, Trade, and Monetize Your{" "}
                  <span className="text-lime relative">
                    Prompts
                    <img src="/img/sketch.svg" alt="Sketch" className="w-full absolute -bottom-3 right-0" />
                  </span>{" "}
                </h1>
              </div>
              <p className="leading-relaxed text-lg text-white/80">
                The innovative platform that connects creators and enthusiasts to buy and sell prompts using blockchain technology. We empower your creativity
                by enabling you to sell captivating ideas embedded within intriguing prompts.
              </p>
              <div className="flex items-center gap-4">
                <Link href="/sell">
                  <Button className="gap-2" variant="lime" size="lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 256 256">
                      <path
                        fill="currentColor"
                        d="m234.8 89.9l-68.7-68.7a19.9 19.9 0 0 0-28.2 0l-24.5 24.5l-57.3 21.4a20.2 20.2 0 0 0-12.7 15.5L20.2 222A11.9 11.9 0 0 0 32 236l2-.2l139.4-23.2a20.2 20.2 0 0 0 15.5-12.7l21.4-57.2l24.5-24.6a19.9 19.9 0 0 0 0-28.2Zm-67.6 99.4L67 206l33.5-33.5a36 36 0 1 0-17-17L50 189L66.7 88.8L117 70l69.1 69ZM104 140a12 12 0 1 1 12 12a12 12 0 0 1-12-12Zm96-21l-63-63l15-15l63 63Z"
                      />
                    </svg>
                    <span>Sell Prompts</span>
                  </Button>
                </Link>
                <Link href="/prompt">
                  <Button className="gap-2 text-lime" variant="link" size="lg">
                    <SearchCheckIcon className="w-5 h-5" />
                    <span>Discover</span>
                  </Button>
                </Link>
              </div>
            </div>
            <div className="h-[40rem] relative">
              <img src="/img/bg-circle.svg" alt="circle" className="w-full absolute z-10 top-24 pl-20 pointer-events-none" />
              <img src="/img/write-bot.webp" alt="Writer" className="w-full absolute z-10 top-20 animate-updown pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      <section className="container px-4 lg:px-6 my-20" id="features">
        <div className="max-w-2xl">
          <h2 className="font-black text-4xl lg:text-6xl mb-8">
            Trade Ideas Seamlessly with <span className="text-primary-800">Promptchain</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="p-8 border rounded-md bg-white border-gray-800/10 cursor-crosshair hover:bg-lime hover:shadow-lg hover:shadow-lime/50 hover:-translate-y-px hover:border-primary-800 transition-all group">
            <div className="w-12 h-12 rounded-md bg-lime border border-primary-800/10 flex items-center justify-center mb-4 group-hover:bg-primary-800 transition-all text-primary-800 group-hover:text-lime group-hover:scale-105 group-hover:-rotate-12 group-hover:shadow-xl delay-75 duration-200">
              <ListChecksIcon />
            </div>
            <h3 className="font-extrabold text-xl mb-2 text-primary-800">List Your Prompts</h3>
            <p className="opacity-80">As a creative mind, you can post your unique prompts on Promptchain, converting your ideas into valuable NFTs.</p>
          </div>
          <div className="p-8 border rounded-md bg-white border-gray-800/10 cursor-crosshair hover:bg-lime hover:shadow-lg hover:shadow-lime/50 hover:-translate-y-px hover:border-primary-800 transition-all group">
            <div className="w-12 h-12 rounded-md bg-lime border border-primary-800/10 flex items-center justify-center mb-4 group-hover:bg-primary-800 transition-all text-primary-800 group-hover:text-lime group-hover:scale-105 group-hover:-rotate-12 group-hover:shadow-xl delay-75 duration-200">
              <SearchCheckIcon />
            </div>
            <h3 className="font-extrabold text-xl mb-2 text-primary-800">Explore Prompts</h3>
            <p className="opacity-80">
              You can explore prompts and choose to either try one (ownership remains with the creator) or purchase one (ownership transfers to you).
            </p>
          </div>
          <div className="p-8 border rounded-md bg-white border-gray-800/10 cursor-crosshair hover:bg-lime hover:shadow-lg hover:shadow-lime/50 hover:-translate-y-px hover:border-primary-800 transition-all group">
            <div className="w-12 h-12 rounded-md bg-lime border border-primary-800/10 flex items-center justify-center mb-4 group-hover:bg-primary-800 transition-all text-primary-800 group-hover:text-lime group-hover:scale-105 group-hover:-rotate-12 group-hover:shadow-xl delay-75 duration-200">
              <Coins />
            </div>
            <h3 className="font-extrabold text-xl mb-2 text-primary-800">Earn Royalties</h3>
            <p className="opacity-80">
              Every time user interact with a prompt, creators earn royalties, encouraging their continuous creativity and innovation.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
