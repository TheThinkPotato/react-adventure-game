import type { Player, Room, RoomExitRegion } from "../Types/types";

export const getRoomExit = (player: Player, room: Room): number | undefined => {
  const exit = room.roomExits?.find((roomExit: RoomExitRegion) => {
    return (
      player.x >= roomExit.startCoord.x &&
      player.x <= roomExit.endCoord.x &&
      player.y >= roomExit.startCoord.y &&
      player.y <= roomExit.endCoord.y
    );
  });
  
  return exit?.targetRoomIndex;
}