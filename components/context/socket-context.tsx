"use client";

import { createContext, useContext, ReactNode } from "react";
import { Socket } from "socket.io-client";
import { useSocket } from "@/hooks/use-socket";

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType>({ socket: null });

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketContext debe usarse dentro de SocketProvider");
  }
  return context;
};

interface SocketProviderProps {
  children: ReactNode;
  serverUrl: string;
}

export const SocketProvider = ({
  children,
  serverUrl,
}: SocketProviderProps) => {
  const socket = useSocket(serverUrl);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
