import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { Player } from "../Types/types";

// Define the context shape
type PlayerContextType = {
  player: Player;
  setPlayer: React.Dispatch<React.SetStateAction<Player>>;
  mirrorPlayer: boolean;
  setMirrorPlayer: React.Dispatch<React.SetStateAction<boolean>>;
};

// Create context with a default (will be overridden by Provider)
const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

// Context provider component
export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [mirrorPlayer, setMirrorPlayer] = useState(false);
  const [player, setPlayer] = useState<Player>({
    x: 0,
    y: 0,
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
export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};
