import type { Player } from "../Types/types";

interface KeyboardControlsProps {
    setPlayer: React.Dispatch<React.SetStateAction<Player>>;
    e: KeyboardEvent;
    canvasHeight: number;
    canvasWidth: number;
    tileSize: number;
}

export const keyboardControls = ({setPlayer, canvasHeight, canvasWidth, tileSize}: KeyboardControlsProps) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    setPlayer((prev: Player) => {
      let { x, y } = prev;
      const items = prev.items || [];
      if (e.key === "ArrowUp") y = Math.max(0, y - 1);
      if (e.key === "ArrowDown")
        y = Math.min(canvasHeight / tileSize - 1, y + 1);
      if (e.key === "ArrowLeft") x = Math.max(0, x - 1);
      if (e.key === "ArrowRight")
        x = Math.min(canvasWidth / tileSize - 1, x + 1);
      return { x, y, items };
    });
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
};
