"use client";

import { RaceType, SessionType } from "@/types";
import { createContext, useContext, useState } from "react";

type ChildrenProps = {
  children: React.ReactNode;
};

type SessionInfoContextProps = {
  getSessionInfo: (
    session: SessionType,
    raceName: string,
    countryName: string
  ) => void;
  sessionInfo: {
    sessionName: string;
    sessionDate: string;
    raceName: string;
    countryName: string;
  };
};

const SessionInfoContext = createContext<SessionInfoContextProps | undefined>(
  undefined
);

function SessionInfoProvider({ children }: ChildrenProps) {
  const [sessionInfo, setSessionInfo] = useState({
    sessionName: "",
    sessionDate: "",
    raceName: "",
    countryName: "",
  });

  const getSessionInfo = (
    session: SessionType,
    raceName: string,
    countryName: string
  ) => {
    if (session) {
      const sessionDate = `${session.date}T${session.time}`;

      setSessionInfo({
        sessionName: session.name,
        sessionDate,
        raceName,
        countryName,
      });
    } else {
      setSessionInfo({ ...sessionInfo });
    }
  };

  return (
    <SessionInfoContext.Provider value={{ getSessionInfo, sessionInfo }}>
      {children}
    </SessionInfoContext.Provider>
  );
}

function useSessionInfo() {
  const context = useContext(SessionInfoContext);
  if (context === undefined) {
    throw new Error("Something went wrong....");
  }
  return context;
}

export { useSessionInfo };
export { SessionInfoProvider };
