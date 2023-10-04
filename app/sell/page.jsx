"use client";

import * as Yup from "yup";
import * as fcl from "@onflow/fcl";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import ConnectWallet from "../../components/ui/connect-wallet";
import { useLoading, useUserStore } from "../../lib/store";
import { CheckCircle2, ChevronLeft, ChevronRight, Rocket } from "lucide-react";
import { useEffect, useState } from "react";
import { ErrorMessage, Field, Formik } from "formik";
import LogoFLow from "../../components/logo/logo-flow";
import { Label } from "../../components/ui/label";
import { createPrompt } from "../../flow/transactions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Page() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const setLoading = useLoading((state) => state.setMsg);
  const user = useUserStore((state) => state.user);
  const [category, setCategory] = useState("GPT");
  const [isClient, setIsClient] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmitData = async (values) => {
    console.log(values);
    if (step === 3) {
      setLoading("Processing...");
      // console.log("SUBMITTED");
      const metadataDict = [];
      const metadata = {...JSON.parse(values.prompt), preview_output: values.preview_output};
      console.log(metadata);
      for (const key in metadata) {
        if (metadata.hasOwnProperty(key)) {
          const value = metadata[key];
          metadataDict.push({
            key: String(key), value: String(value)
          });
        }
      }
      const txId = await createPrompt(values.title, values.description, values.title, parseInt(values.price_to_use), values.price_for_sale, metadataDict);
      console.log(txId);
      fcl.tx(txId).subscribe((e) => {
        if (e?.statusString != "") {
          toast.dismiss();
          toast.loading(e?.statusString);
        }
      });
      await fcl.tx(txId).onceSealed();
      toast.dismiss();
      setLoading(false);

      router.push("/prompt");
    } else {
      setStep((prev) => prev + 1);
    }
  };

  if (!isClient) return "";

  return (
    <section className="my-12">
      <div className="max-w-3xl mx-auto px-4">
        <Card>
          <CardHeader className="border-b mb-4 bg-primary rounded-t-md">
            <ol class="flex items-center w-full text-sm font-bold text-center text-white/80 sm:text-base">
              <li
                class={`${
                  step >= 1 && "text-lime"
                } flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-white/80 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10`}
              >
                <span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-white/80">
                  {step >= 1 ? <CheckCircle2 className="mr-2" /> : <span class="mr-2">1</span>}
                  Setup
                </span>
              </li>
              <li
                class={`${
                  step >= 2 && "text-lime"
                } flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-white/80 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10`}
              >
                <span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-white/80">
                  {step >= 2 ? <CheckCircle2 className="mr-2" /> : <span class="mr-2">2</span>}
                  Details
                </span>
              </li>
              <li class={`${step >= 3 && "text-lime"} flex items-center`}>
                {step >= 3 ? <CheckCircle2 className="mr-2" /> : <span class="mr-2">3</span>}
                Review
              </li>
            </ol>
          </CardHeader>
          <CardContent>
            {step === 0 && (
              <div>
                <h1 className="font-bold text-3xl mb-4">Start selling your prompts</h1>
                <p className="mb-4 text-dark/80">
                  PromptChain is a cutting-edge marketplace fully powered by Flow blockchain technology, focusing on Midjourney, ChatGPT, DALL·E, and Stable
                  Diffusion Prompts. Through PromptChain, you have the opportunity to monetize your Prompt Engineering expertise by offering and selling your
                  own prompts.
                </p>

                <p className="mb-4 text-dark/80">
                  With the security and efficiency guaranteed by Flow blockchain technology, this innovative platform enables you to kickstart your
                  prompt-selling journey in just 2 minutes. Harness the power of blockchain technology to unlock your potential on PromptChain!
                </p>

                {user?.loggedIn ? (
                  <Button size="lg" className="gap-2" onClick={() => setStep((prev) => prev + 1)}>
                    <Rocket className="w-4 h-4" />
                    <span>Sell a prompt</span>
                  </Button>
                ) : (
                  <ConnectWallet />
                )}
              </div>
            )}

            <Formik
              enableReinitialize
              initialValues={{
                title: "",
                description: "",
                price_to_use: "",
                price_for_sale: "",
                prompt: "",
                preview_output: "",
              }}
              validationSchema={Yup.object({
                title: Yup.string().required("Title is required"),
                description: Yup.string().required("Description is required"),
                price_to_use: Yup.number().required("Price to use is required"),
                price_for_sale: Yup.number().required("Price for sale is required"),
              })}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                handleSubmitData(values);
                setSubmitting(false);
              }}
            >
              {(formik) => (
                <form onSubmit={formik.handleSubmit}>
                  {step === 1 && (
                    <div className="space-y-4">
                      <h2 className="font-bold text-2xl mb-4">Setup</h2>

                      <div className="space-y-2">
                        <Label>Category</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                          <button
                            type="button"
                            className={`${
                              category === "GPT" ? "border-primary bg-lime" : "border-gray-200 hover:bg-gray-200"
                            } relative w-full aspect-[5/2] bg-gray-100 border flex items-center justify-center font-bold text-sm rounded-md active:scale-95 transition-all`}
                            onClick={() => setCategory("GPT")}
                          >
                            GPT
                          </button>
                          <button
                            type="button"
                            className={`${
                              category === "DALL-E" ? "border-primary bg-lime" : "border-gray-200 hover:bg-gray-200"
                            } relative w-full aspect-[5/2] bg-gray-100 border flex items-center justify-center font-bold text-sm rounded-md active:scale-95 transition-all`}
                            onClick={() => setCategory("DALL-E")}
                          >
                            DALL-E
                          </button>
                          <button
                            type="button"
                            className="relative w-full aspect-[5/2] bg-gray-100 border flex items-center justify-center font-bold text-sm rounded-md disabled:text-dark/30 disabled:cursor-not-allowed"
                            disabled
                          >
                            Midjourney
                            <span className="absolute bg-red-500 text-[9px] px-1 top-1.5 right-1.5 text-white rounded">Comin Soon</span>
                          </button>
                          <button
                            type="button"
                            className="relative w-full aspect-[5/2] bg-gray-100 border flex items-center justify-center font-bold text-sm rounded-md disabled:text-dark/30 disabled:cursor-not-allowed"
                            disabled
                          >
                            Stable Diffusion
                            <span className="absolute bg-red-500 text-[9px] px-1 top-1.5 right-1.5 text-white rounded">Comin Soon</span>
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Field
                          type="title"
                          name="title"
                          placeholder="...."
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        <ErrorMessage name="title" component="div" className="text-red-500" />
                      </div>

                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Field
                          as="textarea"
                          type="description"
                          name="description"
                          placeholder="...."
                          rows="4"
                          className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        <ErrorMessage name="description" component="div" className="text-red-500" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Price to use</Label>
                          <div className="relative">
                            <LogoFLow className="w-4 h-4 absolute top-2.5 left-2.5" />
                            <Field
                              type="price_to_use"
                              name="price_to_use"
                              placeholder="...."
                              className="pl-8 flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                          </div>
                          <ErrorMessage name="price_to_use" component="div" className="text-red-500" />
                        </div>
                        <div className="space-y-2">
                          <Label>Price for sale</Label>
                          <div className="relative">
                            <LogoFLow className="w-4 h-4 absolute top-2.5 left-2.5" />
                            <Field
                              type="price_for_sale"
                              name="price_for_sale"
                              placeholder="...."
                              className="pl-8 flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                          </div>
                          <ErrorMessage name="price_for_sale" component="div" className="text-red-500" />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <>
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <Label>Prompt</Label>
                          <p className="text-xs text-dark/60">
                            Copy and paste the JSON GPT prompt file from the OpenAI playground, mark any editable sections with [square brackets].
                          </p>
                          <Field
                            as="textarea"
                            type="prompt"
                            name="prompt"
                            placeholder="...."
                            rows="4"
                            className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                          <ErrorMessage name="prompt" component="div" className="text-red-500" />
                        </div>
                        <div className="space-y-1">
                          <Label>Preview Output</Label>
                          <p className="text-xs text-dark/60">
                            A preview output generated this prompt to demonstrate to a potential buyer what your prompt does. Do not include your input prompt.
                          </p>
                          <Field
                            as="textarea"
                            type="preview_output"
                            name="preview_output"
                            placeholder="...."
                            rows="4"
                            className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                          <ErrorMessage name="preview_output" component="div" className="text-red-500" />
                        </div>
                      </div>
                    </>
                  )}

                  {step === 3 && (
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <Label>Title</Label>
                        <h6 className="font-bold">{formik.values.title}</h6>
                      </div>
                      <div className="space-y-1">
                        <Label>Description</Label>
                        <h6 className="font-bold">{formik.values.description}</h6>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                        <div className="space-y-1">
                          <Label>Price to use</Label>
                          <h6 className="font-bold flex items-center gap-2">
                            <LogoFLow className="w-4 h-4" />
                            {formik.values.price_to_use}
                          </h6>
                        </div>
                        <div className="space-y-1">
                          <Label>Price for sale</Label>
                          <h6 className="font-bold flex items-center gap-2">
                            <LogoFLow className="w-4 h-4" />
                            {formik.values.price_for_sale}
                          </h6>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label>Prompt</Label>
                        <h6 className="font-bold">{formik.values.prompt}</h6>
                      </div>
                      <div className="space-y-1">
                        <Label>Preview Output</Label>
                        <h6 className="font-bold">{formik.values.preview_output}</h6>
                      </div>
                    </div>
                  )}

                  {step >= 1 && (
                    <div className="flex items-center justify-between border-t pt-4 mt-6">
                      <Button type="button" className="gap-2" onClick={() => setStep((prev) => prev - 1)}>
                        <ChevronLeft className="w-4 h-4" />
                        Back
                      </Button>

                      <Button type="submit" className="gap-2" disabled={(step < 3 && !formik.isValid) || isSubmit}>
                        <span>{step === 3 ? "Submit" : "Next"}</span>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
