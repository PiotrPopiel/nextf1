"use client";

import { useSessionInfo } from "@/contexts/SessionInfo";
import type { SessionType } from "@/types";

type SessionProps = {
  session: SessionType;
  raceName: string;
  countryName: string;
};

export default function Session({
  session,
  raceName,
  countryName,
}: SessionProps) {
  const { getSessionInfo } = useSessionInfo();

  const handleClick = () => {
    window.scroll({ top: 0, behavior: "smooth" });
    getSessionInfo(session, raceName, countryName);
  };

  return (
    <button
      onClick={handleClick}
      className="hover:bg-slate-900 w-full flex p-1">
      <p className="text-sm self-start ml-2 p-2">| {session && session.name}</p>
    </button>
  );
}
