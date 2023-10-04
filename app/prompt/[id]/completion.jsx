"use client";

import { useCompletion } from "ai/react";
import LogoFLow from "@/components/logo/logo-flow";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
import { JetBrains_Mono } from "next/font/google";
import { useCallback, useEffect, useState } from "react";

const jet = JetBrains_Mono({ subsets: ["latin"] });

export default function PromptCompletion({ prompt }) {
  const [inputs, setInputs] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const { completion, input, handleInputChange, handleSubmit, complete } = useCompletion({
    body: {
      inputValues: inputValues,
    },
  });

  useEffect(() => {
    if (prompt?.metadata) {
      if (prompt.metadata.hasOwnProperty("prompt")) {
        const textInBrackets = prompt.metadata.prompt.match(/\[(.*?)\]/g)?.map((teks) => teks.replace(/\[|\]/g, "").trim());
        if (textInBrackets !== undefined && textInBrackets.length > 0) {
          setInputs(textInBrackets);
        } else {
          setInputs([]);
        }
      }
    }
  }, [prompt]);

  const handleInputFieldChange = (e) => {
    const { name, value } = e.target;

    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleTryPrompt = useCallback(
    async (c) => {
      console.log(c);
      await complete(c);
    },
    [complete]
  );

  return (
    <>
      {inputs != null && inputs != undefined && (
        <div className="space-y-4 mt-4">
          {inputs.map((i) => (
            <div key={i} className="flex flex-col gap-2">
              <Label>{i}</Label>
              <input
                placeholder="...."
                type="text"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                name={`${i}`}
                value={inputValues[`${i}`] || ""}
                onChange={handleInputFieldChange}
              />
            </div>
          ))}
        </div>
      )}

      <Alert variant="destructive" className="my-4">
        <Info className="h-4 w-4" />
        <AlertDescription>You will be charged a fee of {prompt?.priceToUse} FLOW. The results will be available immediately.</AlertDescription>
      </Alert>

      <Button className="gap-2 w-full" variant="primary" size="lg" onClick={() => handleTryPrompt(prompt?.metadata)}>
        <span>Try Prompt</span>
        <h6 className={`flex items-center gap-1 ${jet.className}`}>
          <LogoFLow className="w-4 h-4" />
          <span>{prompt?.priceToUse}</span>
        </h6>
      </Button>

      <div className="whitespace-pre-wrap my-6 border border-primary bg-lime text-primary p-3 rounded">
        <h6 className="font-bold uppercase mb-3">Result:</h6>
        {completion || "-"}
      </div>
    </>
  );
}
