import { FC, useEffect, useState } from "react";

import { useRoomState } from "../contexts/socket/useRoomState";

import { JoinRoomForm } from "./JoinRoomForm";
import { RoomMembersList } from "./RoomMembersList";
import { TextLogs } from "./TextLogs";
import { SendTextForm } from "./SendTextForm";

interface IProps {
  roomId: string;
}

export const Body: FC<IProps> = ({ roomId }) => {
  const { joined } = useRoomState();
  const [wallet, setWallet] = useState({});
  useEffect(() => {
    if (localStorage) {
      setWallet(JSON.parse(localStorage.getItem("wallet")));
    }
  }, []);

  return (
    <div>
      <JoinRoomForm roomId={roomId} publicKey={wallet?.publicKey} />
      {joined && (
        <>
          <RoomMembersList />
          <TextLogs />
          <SendTextForm />
        </>
      )}
    </div>
  );
};
