import type { Room, RoomObject } from "../../Types/types";

export const renderRoomObjects = (
  room: Room,
  ctx: CanvasRenderingContext2D,
  tileSize: number
) => {
  room.roomObjects?.forEach((obj: RoomObject) => {
    const img = new Image();
    img.src = obj.image;
    ctx.drawImage(
      img,
      obj.x * tileSize,
      obj.y * tileSize - obj.objectSize.height * tileSize + tileSize,
      obj.objectSize.width * tileSize,
      obj.objectSize.height * tileSize
    );
  });
};
