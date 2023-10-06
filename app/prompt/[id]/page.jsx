"use client";

import LogoFLow from "../../../components/logo/logo-flow";
import { Button } from "../../../components/ui/button";
import { findPrompt, getAllOwners } from "../../../flow/scripts";
import { JetBrains_Mono } from "next/font/google";
import { useParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import PromptCompletion from "./completion";
import toast from "react-hot-toast";

const jet = JetBrains_Mono({ subsets: ["latin"] });

export default function Page() {
  const { id } = useParams();
  const [owners, setOwners] = useState([]);
  const [prompt, setPrompt] = useState([]);
  const [isOpenTry, setIsOpenTry] = useState(false);

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
                  <Button className="gap-2" variant="primary" onClick={() => setIsOpenTry(true)}>
                    <span>Try Prompt</span>
                    <h6 className={`flex items-center gap-1 ${jet.className}`}>
                      <LogoFLow className="w-4 h-4" />
                      <span>{prompt?.priceToUse}</span>
                    </h6>
                  </Button>

                  <Button className="gap-2" variant="primary" onClick={() => toast.error("This features coming very soon!")}>
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

            {prompt?.metadata?.preview_output && (
              <div className="mt-6">
                <h5 className="font-bold text-xl mb-2">Preview Output</h5>
                <p>{prompt?.metadata?.preview_output}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Transition appear show={isOpenTry} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsOpenTry(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-bold leading-6 text-gray-900">
                    Try Prompt: {prompt?.title}
                  </Dialog.Title>
                  <hr className="my-4" />
                  <div className="mt-2">
                    <PromptCompletion prompt={prompt} owners={owners} />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </section>
  );
}
