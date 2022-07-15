import { FC, useState, useEffect, useMemo } from "react";
import { generateXrpAccount } from "./generateXrpAccount";
import { XrpIface } from "../../../shared/XrpAccount";
import XrpContext from "./XrpContext";
export const XrpProvider: FC = ({ children }) => {
  const [account, setAccount] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [seed, setSeed] = useState("");

  // fetch user agent and set "ua"
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    async function genAccount() {
      const wallet = await generateXrpAccount();
      setAccount(wallet.classicAddress);
      setPrivateKey(wallet.privateKey);
      setPublicKey(wallet.publicKey);
      setSeed(wallet.seed);
    }
    genAccount();
  }, []);

  const data: XrpIface = useMemo(
    () => ({
      account: account,
      privateKey: privateKey,
      publicKey: publicKey,
      seed: seed,
    }),
    [account, privateKey, publicKey, seed]
  );

  return <XrpContext.Provider value={data}>{children}</XrpContext.Provider>;
};
