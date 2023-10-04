"use client";

import LogoFLow from "../../components/logo/logo-flow";
import { getAllOwners, getAllPrompts } from "../../flow/scripts";
import { JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";

const jet = JetBrains_Mono({ subsets: ["latin"] });

export default function Page() {
  const [prompts, setPrompts] = useState([]);
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    getAllOwners().then((res) => {
      setOwners(res);
    });
    getAllPrompts().then((res) => {
      setPrompts(res);
    });
  }, []);

  return (
    <section className="my-12">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {prompts.map((i) => (
            <Link href={`/prompt/${i.id}`} key={i.id} className="w-full bg-white border rounded-md shadow-sm hover:shadow-xl transition-all group">
              <div className="w-full aspect-video bg-lime p-3 relative flex items-center justify-center">
                <span className="absolute top-3 left-3 text-xs font-semibold bg-primary text-white rounded px-1 py-px">{i.category || "Uncategory"}</span>
                <h2 className={`font-bold text-4xl text-primary ${jet.className}`}>#{i.id}</h2>
              </div>
              <div className="p-4 flex flex-col justify-between">
                <span className={`text-xs mb-2 text-dark/60 group-hover:text-dark ${jet.className}`}>By: {owners[i.id]}</span>
                <h4 className="line-clamp-2 font-bold group-hover:text-primary group-hover:underline">{i.title}</h4>
                <hr className="my-3" />
                <div className="flex items-center justify-between text-xs font-bold">
                  <h6 className={`flex items-center gap-2 ${jet.className}`}>
                    <LogoFLow className="w-4 h-4" />
                    <span className="tracking-wider">{i.priceToUse} FLOW</span>
                  </h6>
                  <span className="text-dark/60">0 Used</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
