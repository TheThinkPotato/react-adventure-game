import type { Player, Region } from "../Types/types";

interface KeyboardControlsProps {
    setPlayer: React.Dispatch<React.SetStateAction<Player>>;
    e: KeyboardEvent;
    canvasHeight: number;
    canvasWidth: number;
    tileSize: number;
    playerRegion?: Region | undefined;
    setMirrorPlayer: React.Dispatch<React.SetStateAction<boolean>>;
}

export const keyboardControls = ({setPlayer, canvasHeight, canvasWidth, tileSize, playerRegion, setMirrorPlayer}: KeyboardControlsProps) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    
    setPlayer((prev: Player) => {
      let { x, y } = prev;
      const items = prev.items || [];
      if (e.key === "ArrowUp") y = Math.max(0, y - 1);
      if (e.key === "ArrowDown")
        y = Math.min(canvasHeight / tileSize - 1, y + 1);
      if (e.key === "ArrowLeft") 
        {
          x = Math.max(0, x - 1);
          setMirrorPlayer(true);
        };
      if (e.key === "ArrowRight")
        {
          x = Math.min(canvasWidth / tileSize - 1, x + 1);
          setMirrorPlayer(false);
        };
      return { x, y, items, playerRegion };
    });
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
};
