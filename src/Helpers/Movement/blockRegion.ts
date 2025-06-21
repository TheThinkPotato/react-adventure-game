import type { Player, Region, Room } from "../../Types/types";

type Direction = "up" | "down" | "left" | "right";

interface CollisionCheck {
  targetX: number;
  targetY: number;
  checkX: (region: Region) => boolean;
  checkY: (region: Region) => boolean;
}

const getCollisionCheck = (player: Player, direction: Direction): CollisionCheck => {
  const checks: Record<Direction, CollisionCheck> = {
    up: {
      targetX: player.x,
      targetY: player.y - 1,
      checkX: (region) => player.x >= region.startCoord.x && player.x <= region.endCoord.x,
      checkY: (region) => region.endCoord.y === player.y - 1
    },
    down: {
      targetX: player.x,
      targetY: player.y + 1,
      checkX: (region) => player.x >= region.startCoord.x && player.x <= region.endCoord.x,
      checkY: (region) => region.startCoord.y === player.y + 1
    },
    left: {
      targetX: player.x - 1,
      targetY: player.y,
      checkX: (region) => region.endCoord.x === player.x - 1,
      checkY: (region) => player.y >= region.startCoord.y && player.y <= region.endCoord.y
    },
    right: {
      targetX: player.x + 1,
      targetY: player.y,
      checkX: (region) => region.startCoord.x === player.x + 1,
      checkY: (region) => player.y >= region.startCoord.y && player.y <= region.endCoord.y
    }
  };
  
  return checks[direction];
};

const checkBlockRegions = (room: Room, check: CollisionCheck): boolean => {
  return room.blockRegions.some(
    (region) => check.checkX(region) && check.checkY(region)
  );
};

const checkRoomObjects = (room: Room, check: CollisionCheck): boolean => {
  return room.roomObjects?.some((obj) =>
    obj.blockRegions?.some(
      (region) => check.checkX(region) && check.checkY(region)
    )
  ) ?? false;
};

const checkRoomExits = (room: Room, check: CollisionCheck): boolean => {
  return room.roomExits?.some(
    (exit) => 
      check.checkX(exit) && 
      check.checkY(exit) && 
      !(exit.isOpen && 
      !exit.isBlocked)
  ) ?? false;
};

export const checkNextMoveBlockRegions = (
  player: Player,
  room: Room,
  direction: string
): boolean => {
  if (!["up", "down", "left", "right"].includes(direction)) {
    return false;
  }

  const check = getCollisionCheck(player, direction as Direction);
  
  return (
    checkBlockRegions(room, check) ||
    checkRoomObjects(room, check) ||
    checkRoomExits(room, check)
  );
};