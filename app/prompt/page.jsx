import LogoFLow from "@/components/logo/logo-flow";
import { JetBrains_Mono } from "next/font/google";
import Link from "next/link";

const jet = JetBrains_Mono({ subsets: ["latin"] });

const datas = [
  {
    id: 1,
    category: "GPT",
    title: "Web and Mobile Application Solution Expert",
    price_try: 1,
    price_buy: 10,
    creator: "0x5da99ef85505a2fd",
  },
  {
    id: 2,
    category: "GPT",
    title: "Instagram - Ideas Generator | ChatGPT Prompt",
    price_try: 2,
    price_buy: 19,
    creator: "0x5da99ef85505a2fd",
  },
  {
    id: 3,
    category: "GPT",
    title: "Crafting Your Perfect Resume",
    price_try: 10,
    price_buy: 100,
    creator: "0x5da99ef85505a2fd",
  },
  {
    id: 4,
    category: "GPT",
    title: "Dynamic LinkedIn Bio Builder",
    price_try: 5,
    price_buy: 25,
    creator: "0x5da99ef85505a2fd",
  },
];

export default function Page() {
  return (
    <section className="my-12">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {datas.map((i) => (
            <Link href={`/prompt/${i.id}`} key={i.id} className="w-full bg-white border rounded-md shadow-sm hover:shadow-xl transition-all group">
              <div className="w-full aspect-video bg-lime p-3 relative flex items-center justify-center">
                <span className="absolute top-3 left-3 text-xs font-semibold bg-primary text-white rounded px-1 py-px">{i.category}</span>
                <h2 className={`font-bold text-4xl text-primary ${jet.className}`}>#{i.id}</h2>
              </div>
              <div className="p-4 flex flex-col justify-between">
                <span className={`text-xs mb-2 text-dark/60 group-hover:text-dark ${jet.className}`}>By: {i.creator}</span>
                <h4 className="line-clamp-2 font-bold group-hover:text-primary group-hover:underline">{i.title}</h4>
                <hr className="my-3" />
                <div className="flex items-center justify-between text-xs font-bold">
                  <h6 className={`flex items-center gap-2 ${jet.className}`}>
                    <LogoFLow className="w-4 h-4" />
                    <span>{i.price_buy}</span>
                  </h6>
                  <span>12 Used</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
