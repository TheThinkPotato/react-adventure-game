import type { Player, Room } from "../Types/types";
import { checkNextMoveBlockRegions } from "./Movement/blockRegion";
import { updatePlayerRegion } from "./playerRegion";

interface KeyboardControlsProps {
  setPlayer: React.Dispatch<React.SetStateAction<Player>>;
  player: Player;
  e: KeyboardEvent;
  canvasHeight: number;
  canvasWidth: number;
  tileSize: number;
  // playerRegionSize?: Region | undefined;
  setMirrorPlayer: React.Dispatch<React.SetStateAction<boolean>>;
  room: Room;
}


export const keyboardControls = ({
  setPlayer,
  player,
  canvasHeight,
  canvasWidth,
  tileSize,
  // playerRegionSize: playerRegion,
  setMirrorPlayer,
  room,
}: KeyboardControlsProps) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    setPlayer((prev: Player) => {
      let { x, y } = prev;
      const items = prev.items || [];
      if (
        e.key === "ArrowUp" &&
        !checkNextMoveBlockRegions(player, room, "up")
      ) {
        y = Math.max(0, y - 1);
      }
      if (
        e.key === "ArrowDown" &&
        !checkNextMoveBlockRegions(player, room, "down")
      )
        y = Math.min(canvasHeight / tileSize - 1, y + 1);
      if (
        e.key === "ArrowLeft" &&
        !checkNextMoveBlockRegions(player, room, "left")
      ) {
        x = Math.max(0, x - 1);
        setMirrorPlayer(true);
      }
      if (
        e.key === "ArrowRight" &&
        !checkNextMoveBlockRegions(player, room, "right")
      ) {
        x = Math.min(canvasWidth / tileSize - 1, x + 1);
        setMirrorPlayer(false);
      }

      // update playerRegion
      const playerRegion = updatePlayerRegion(player, room);
      setPlayer({ ...player, playerRegion: playerRegion, x, y, items });

      return { x, y, items, playerRegionSize: playerRegion };
    });
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
};
