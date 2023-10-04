"use client";

import { useLoading } from "@/lib/store";
import { LoaderIcon } from "lucide-react";

export default function Loading() {
  const loading = useLoading((state) => state.msg);

  if (loading === false) {
    return;
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur z-[70] flex items-center justify-center">
      <div className="text-white text-center">
        <LoaderIcon className="animate-spin mx-auto mb-3" />
        <p className="font-bold">{loading}</p>
      </div>
    </div>
  );
}
