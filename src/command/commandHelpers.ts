import { rooms as allRooms } from "../App";
import type { Item, Player, Region } from "../Types/types";

export interface roomExitState {
  exitLinkId: string;
  isOpen?: boolean;
  isLocked?: boolean;
  isBlocked?: boolean;
}

export const syncAllRoomExits = (roomExitState: roomExitState) => {
  // sync all rooms open/closed state
  allRooms.forEach((r) => {
    r.roomExits?.forEach((e) => {
      if (e.exitLinkId === roomExitState.exitLinkId) {
        if (roomExitState.isOpen !== undefined) {
          e.isOpen = roomExitState.isOpen;
        }
        if (roomExitState.isLocked !== undefined) {
          e.isLocked = roomExitState.isLocked;
        }
        if (roomExitState.isBlocked !== undefined) {
          e.isBlocked = roomExitState.isBlocked;
        }
      }
    });
  });
};

export const isPlayerInRangeOffRegion = (player: Player, region: Region) => {
    // Check if player region overlaps with the target region
  
    const playerOverlapsRegion =
      player.playerRegion.startCoord.x <= region.endCoord.x - 1 &&
      player.playerRegion.endCoord.x + 1 >= region.startCoord.x &&
      player.playerRegion.startCoord.y <= region.endCoord.y &&
      player.playerRegion.endCoord.y >= region.startCoord.y;
  
    return playerOverlapsRegion;
  };
  
  export const isPlayerInRangeOfObject = (player: Player, obj: Item) => {
    return (
      obj.x !== undefined &&
      obj.y !== undefined &&
      obj.x >= player.playerRegion.startCoord.x &&
      obj.x <= player.playerRegion.endCoord.x &&
      obj.y >= player.playerRegion.startCoord.y &&
      obj.y <= player.playerRegion.endCoord.y
    );
  };