import LogoFLow from "@/components/logo/logo-flow";
import { Button } from "@/components/ui/button";
import { JetBrains_Mono } from "next/font/google";

const jet = JetBrains_Mono({ subsets: ["latin"] });

export default function Page() {
  return (
    <section className="my-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          <div>
					<div className="w-full bg-white border rounded-md shadow-sm">
              <div className="w-full aspect-video bg-lime p-3 relative flex items-center justify-center">
                <span className="absolute top-3 left-3 text-xs font-semibold bg-primary text-white rounded px-1 py-px">GPT</span>
                <h2 className={`font-bold text-4xl text-primary ${jet.className}`}>#1</h2>
              </div>
              <div className="p-4 flex flex-col justify-between">
                <span className={`text-xs text-dark/60 ${jet.className}`}>By: 0x5da99ef85505a2fd</span>
                <hr className="my-4" />
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<Button className="gap-2" variant="primary">
										<span>Try Prompt</span>
										<h6 className={`flex items-center gap-1 ${jet.className}`}>
											<LogoFLow className="w-4 h-4" />
											<span>10</span>
										</h6>
									</Button>
									<Button className="gap-2" variant="primary">
										<span>Buy Prompt</span>
										<h6 className={`flex items-center gap-1 ${jet.className}`}>
											<LogoFLow className="w-4 h-4" />
											<span>10</span>
										</h6>
									</Button>
								</div>
              </div>
            </div>
          </div>
          <div className="md:col-span-2">
						<h1 className="font-bold text-2xl">Web and Mobile Application Solution Expert</h1>
						<hr className="my-4" />
						<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, nostrum illo quasi modi voluptatibus veritatis numquam vitae voluptate deleniti enim quas. Dolore quis maxime id repellendus modi cumque labore ea.</p>
					</div>
        </div>
      </div>
    </section>
  );
}
