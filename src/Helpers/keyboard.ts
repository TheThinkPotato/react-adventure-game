import type { Player, Region, Room } from "../Types/types";

interface KeyboardControlsProps {
  setPlayer: React.Dispatch<React.SetStateAction<Player>>;
  player: Player;
  e: KeyboardEvent;
  canvasHeight: number;
  canvasWidth: number;
  tileSize: number;
  playerRegion?: Region | undefined;
  setMirrorPlayer: React.Dispatch<React.SetStateAction<boolean>>;
  room: Room;
}

const checkNextMoveBlockRegions = (
  player: Player,
  room: Room,
  direction: string
) => {
  if (direction === "up") {
    return room.blockRegions.some(
      (region) =>
        region.endCoord.y === player.y - 1 &&
        player.x >= region.startCoord.x &&
        player.x <= region.endCoord.x
    );
  }
  if (direction === "down") {
    return room.blockRegions.some(
      (region) =>
        region.startCoord.y === player.y + 1 &&
        player.x >= region.startCoord.x &&
        player.x <= region.endCoord.x
    );
  }
  if (direction === "left") {
    return room.blockRegions.some(
      (region) =>
        region.endCoord.x === player.x - 1 &&
        player.y >= region.startCoord.y &&
        player.y <= region.endCoord.y
    );
  }
  if (direction === "right") {
    return room.blockRegions.some(
      (region) =>
        region.startCoord.x === player.x + 1 &&
        player.y >= region.startCoord.y &&
        player.y <= region.endCoord.y
    );
  }
  return false;
};

export const keyboardControls = ({
  setPlayer,
  player,
  canvasHeight,
  canvasWidth,
  tileSize,
  playerRegion,
  setMirrorPlayer,
  room,
}: KeyboardControlsProps) => {
  console.log("player x,y: ", player.x, player.y);

  const handleKeyDown = (e: KeyboardEvent) => {
    setPlayer((prev: Player) => {
      let { x, y } = prev;
      const items = prev.items || [];
      if (e.key === "ArrowUp" && !checkNextMoveBlockRegions(player, room, "up"))
        y = Math.max(0, y - 1);
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
      return { x, y, items, playerRegion };
    });
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
};
