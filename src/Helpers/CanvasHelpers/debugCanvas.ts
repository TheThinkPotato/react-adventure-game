// Draw the block regions on the background image

import type { Player, Region, Room, RoomExitRegion, RoomObject } from "../../Types/types";

export const renderRoomBlockRegions = (
  room: Room,
  ctx: CanvasRenderingContext2D,
  tileSize: number
) => {
  room.blockRegions.forEach((region: Region) => {
    ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
    for (let x = region.startCoord.x; x <= region.endCoord.x; x++) {
      for (let y = region.startCoord.y; y <= region.endCoord.y; y++) {
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      }
    }
  });
};

export const renderRoomObjectBlockRegions = (
  room: Room,
  ctx: CanvasRenderingContext2D,
  tileSize: number
) => {
  room.roomObjects?.forEach((obj: RoomObject) => {
    obj.blockRegions?.forEach((region: Region) => {
      ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
      for (let x = region.startCoord.x; x <= region.endCoord.x; x++) {
        for (let y = region.startCoord.y; y <= region.endCoord.y; y++) {
          ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
      }
    });
  });
};

export const renderGrid = (
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  tileSize: number
) => {
  ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
  for (let x = 0; x < canvasWidth; x += tileSize) {
    ctx.fillRect(x, 0, 1, canvasHeight);
  }
  for (let y = 0; y < canvasHeight; y += tileSize) {
    ctx.fillRect(0, y, canvasWidth, 1);
  }
};

export const renderPlayerRegion = (
  currentRoom: Room,
  ctx: CanvasRenderingContext2D,
  player: Player,
  tileSize: number
) => {
  ctx.fillStyle = "rgba(0, 0, 255, 0.2)";
  const width =
    (currentRoom.playerRegionSize.endCoord.x -
      currentRoom.playerRegionSize.startCoord.x +
      1) *
    tileSize;
  const height =
    (currentRoom.playerRegionSize.endCoord.y -
      currentRoom.playerRegionSize.startCoord.y +
      1) *
    tileSize;
  ctx.fillRect(
    currentRoom.playerRegionSize.startCoord.x * tileSize +
      player.x * tileSize -
      (currentRoom.playerRegionSize.endCoord.x / 2) * tileSize,
    currentRoom.playerRegionSize.startCoord.y * tileSize +
      player.y * tileSize -
      (currentRoom.playerRegionSize.endCoord.y / 2) * tileSize,
    width,
    height
  );
};

export const renderRoomExits = (
  room: Room,
  ctx: CanvasRenderingContext2D,
  tileSize: number
) => {
  room.roomExits?.forEach((region: RoomExitRegion) => {
    ctx.fillStyle = "rgba(0, 200, 0, 0.2)";
    for (let x = region.startCoord.x; x <= region.endCoord.x; x++) {
      for (let y = region.startCoord.y; y <= region.endCoord.y; y++) {
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      }
    }
  });
};

export const playerPoint = (
  ctx: CanvasRenderingContext2D,
  player: Player,
  tileSize: number
) => {
  ctx.fillStyle = "rgba(0, 255, 0)";
  ctx.fillRect(player.x * tileSize, player.y * tileSize, tileSize, tileSize);
};
