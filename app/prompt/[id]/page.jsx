"use client";

import LogoFLow from "../../../components/logo/logo-flow";
import { Button } from "../../../components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../../../components/ui/sheet";
import { findPrompt, getAllOwners } from "../../../flow/scripts";
import { JetBrains_Mono } from "next/font/google";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import PromptCompletion from "./completion";

const jet = JetBrains_Mono({ subsets: ["latin"] });

export default function Page() {
  const { id } = useParams();
  const [owners, setOwners] = useState([]);
  const [prompt, setPrompt] = useState([]);

  useEffect(() => {
    getAllOwners().then((res) => {
      setOwners(res);
    });
    findPrompt(id).then((res) => {
      setPrompt(res);
    });
  }, [id]);

  return (
    <section className="my-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          <div>
            <div className="w-full bg-white border rounded-md shadow-sm">
              <div className="w-full aspect-video bg-lime p-3 relative flex items-center justify-center">
                <span className="absolute top-3 left-3 text-xs font-semibold bg-primary text-white rounded px-1 py-px">{prompt?.category || "Uncategory"}</span>
                <h2 className={`font-bold text-4xl text-primary ${jet.className}`}>#1</h2>
              </div>
              <div className="p-4 flex flex-col justify-between">
                <span className={`text-xs text-dark/60 ${jet.className}`}>By: {owners[prompt?.id]}</span>
                <hr className="my-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button className="gap-2" variant="primary">
                        <span>Try Prompt</span>
                        <h6 className={`flex items-center gap-1 ${jet.className}`}>
                          <LogoFLow className="w-4 h-4" />
                          <span>{prompt?.priceToUse}</span>
                        </h6>
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="w-2/3 sm:w-1/2 md:w-1/2">
                      <SheetHeader>
                        <SheetTitle>Try Prompt: {prompt?.title}</SheetTitle>
                        <SheetDescription>
                          <PromptCompletion prompt={prompt} />
                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>

                  <Button className="gap-2" variant="primary">
                    <span>Buy Prompt</span>
                    <h6 className={`flex items-center gap-1 ${jet.className}`}>
                      <LogoFLow className="w-4 h-4" />
                      <span>{prompt?.priceForSale}</span>
                    </h6>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-2">
            <h1 className="font-bold text-2xl">{prompt?.title}</h1>
            <hr className="my-4" />
            <p>{prompt?.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
