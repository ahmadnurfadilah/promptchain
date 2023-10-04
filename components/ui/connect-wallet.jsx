"use client";

import { useRouter } from "next/navigation";
import { Button } from "./button";
import { useUserStore } from "@/lib/store";
import { useEffect, useState } from "react";
import "../../flow/config";
import * as fcl from "@onflow/fcl";
import LogoFLow from "../logo/logo-flow";
import { strAddr } from "@/lib/utils";

export default function ConnectWallet() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  useEffect(() => fcl.currentUser.subscribe(setUser), [setUser]);

  useEffect(() => {
    if (user?.loggedIn) {
      router.refresh();
    }
  }, [router, user]);

  return (
    <>
      {isClient ? (
        <>
          {user?.loggedIn ? (
            <Button className="gap-2" onClick={() => fcl.unauthenticate()}>
              {strAddr(user.addr)}
            </Button>
          ) : (
            <Button className="gap-2" onClick={() => fcl.authenticate()}>
              <LogoFLow />
              Connect Wallet
            </Button>
          )}
        </>
      ) : (
        <Button className="gap-2">
          Loading...
        </Button>
      )}
    </>
  );
}
