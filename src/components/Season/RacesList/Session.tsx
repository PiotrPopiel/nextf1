"use client";

import { useSessionInfo } from "@/contexts/SessionInfo";
import type { SessionType } from "@/types";

type SessionProps = {
  session: SessionType;
  raceName: string;
  countryName: string;
  tabIdx: number;
};

type EventType = React.KeyboardEvent<HTMLDivElement> &
  React.MouseEvent<HTMLDivElement>;

export default function Session({
  session,
  raceName,
  countryName,
  tabIdx,
}: SessionProps) {
  const { getSessionInfo } = useSessionInfo();

  const handleClick = (e: EventType) => {
    if (e.key === "Enter" || e.type === "click")
      window.scroll({ top: 0, behavior: "smooth" });
    getSessionInfo(session, raceName, countryName);
  };

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleClick}
      tabIndex={tabIdx}
      className="hover:bg-slate-900 cursor-pointer w-full flex p-1">
      <p className="text-sm self-start ml-2 p-2">| {session && session.name}</p>
    </div>
  );
}
