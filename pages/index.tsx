import { NextPage } from "next";
import Link from "next/link";
import { Rooms } from "../components/index/Rooms";
import MyApp from "./_app";
import { useRef, useCallback } from "react";
import { Refreshable } from "../components/Refreshable";
import { XrpProvider } from "../components/contexts/xrp/XrpProvider";
import { Land } from "../components/rooms/Land";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";
import * as xrpl from "xrpl";
const page: NextPage = () => {
  const ref = useRef<Refreshable>();

  const handleRefresh = useCallback(
    () => ref.current && ref.current.refresh(),
    [ref.current]
  );

  return (
    <>
      <Head>
        <title>Realtime Chat App with Ably, NextJS and Vercel</title>
        <link
          rel="icon"
          href="https://static.ably.dev/motif-red.svg?nextjs-vercel"
          type="image/svg+xml"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css"
          integrity="sha256-mmgLkCYLUQbXn0B1SRqzHar6dCnv9oZFPEC1g1cwlkk="
        />

        <link rel="stylesheet" href="css/style.css" />

        <script src="https://unpkg.com/xrpl@2.0.0/build/xrpl-latest-min.js"></script>
      </Head>
      <XrpProvider>
        <div>
          <section>
            <p>
              hello world! to create a new room, visit{" "}
              <Link href="/new">
                <a>this link</a>
              </Link>
              .
            </p>
            <p>existing rooms are listed below:</p>
            <Rooms ref={ref} />
            <button disabled={!!ref.current} onClick={handleRefresh}>
              refresh
            </button>
          </section>

          <Land xrpl={xrpl}></Land>
        </div>
      </XrpProvider>
    </>
  );
};

export default page;
