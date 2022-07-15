import Router from "next/router";
import { v4 as uuidv4 } from "uuid";

import page from "./404";

page.getInitialProps = async ({ res }) => {
  const roomName = localStorage.getItem("selected-room");
  console.log("🚀 ~ file: new.tsx ~ line 7 ~ page.getInitialProps= ~ res", res);
  const uuid = uuidv4();
  if (res) {
    res.writeHead(302, {
      Location: `/rooms/${roomName}`,
    });
    res.end();
    return {};
  }
  Router.push(`/rooms/${roomName}`);
  return {};
};

export default page;
