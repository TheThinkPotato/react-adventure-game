import { type Player, type Region, type Room } from "../Types/types";

export const updatePlayerRegion = (
  player: Player,
  room: Room
) => {
  if (!room.playerRegionSize) {
    return;
  }

  const startCoord = {    
    x: player.x - Math.floor(room.playerRegionSize.endCoord.x /2) - 1,
    y: player.y - Math.floor(room.playerRegionSize.endCoord.y /2),
  };
  const endCoord = {
    x: startCoord.x + room.playerRegionSize.endCoord.x,
    y: startCoord.y + room.playerRegionSize.endCoord.y,
  };

  const newPlayerRegion: Region = {
    startCoord,
    endCoord,
  };

  return newPlayerRegion;
};
