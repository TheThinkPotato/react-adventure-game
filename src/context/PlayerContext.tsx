import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { Player } from "../Types/types";

// Define the context shape
export type PlayerContextType = {
  player: Player;
  setPlayer: React.Dispatch<React.SetStateAction<Player>>;
  mirrorPlayer: boolean;
  setMirrorPlayer: React.Dispatch<React.SetStateAction<boolean>>;
};

// Create context with a default (will be overridden by Provider)
export const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

// Context provider component
export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [mirrorPlayer, setMirrorPlayer] = useState(false);
  const [player, setPlayer] = useState<Player>({
    x: -999,
    y: -999,
    items: [],
  });

  return (
    <PlayerContext.Provider
      value={{ player, setPlayer, mirrorPlayer, setMirrorPlayer }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

// Custom hook to use player context
export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};
