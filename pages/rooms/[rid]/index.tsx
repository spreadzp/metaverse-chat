import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { UserProfileProvider } from "../../../components/contexts/profile/UserProfileProvider";
import SocketProvider from "../../../components/contexts/socket/SocketProvider";
import { XrpProvider } from "../../../components/contexts/xrp/XrpProvider";
import { Body } from "../../../components/rooms/Body";
//import Script from 'next/script'

const page: NextPage = () => {
  const [roomId, setRoomId] = useState<string>(null);
  const router = useRouter();

  useEffect(() => {
    setRoomId(router.query.rid as string);
  }, [router.query]);

  return (
    <>
      <Head>
        <title>Realtime Chat App with Ably, NextJS and Vercel</title>
        <link
          rel="icon"
          href="https://static.ably.dev/motif-red.svg?nextjs-vercel"
          type="image/svg+xml"
        />
        <script src="https://unpkg.com/xrpl@2.0.0/build/xrpl-latest-min.js"></script>
      </Head>
      <XrpProvider>
        <UserProfileProvider>
          <SocketProvider>
            <Body roomId={roomId} />
          </SocketProvider>
        </UserProfileProvider>
      </XrpProvider>
    </>
  );
};

export default page;
