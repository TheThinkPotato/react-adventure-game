import type { Item, Room, RoomObject } from "../../Types/types";

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

export const renderPlayer = (
  ctx: CanvasRenderingContext2D,
  tileSize: number,
  mirrorPlayer: boolean,
  playerImg: HTMLImageElement,
  playerPosX: number,
  playerPosY: number,
  playerScale: number
) => {
  if (mirrorPlayer) {
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(
      playerImg,
      -playerPosX - tileSize, // Adjust x position when mirrored
      playerPosY,
      tileSize * playerScale,
      tileSize * -playerScale
    );
    ctx.restore();
  } else {
    ctx.drawImage(
      playerImg,
      playerPosX,
      playerPosY,
      tileSize * -playerScale,
      tileSize * -playerScale
    );
  }
};

export const renderObjects = (
  room: Room,
  ctx: CanvasRenderingContext2D,
  tileSize: number,
  //============ player props below ============
  mirrorPlayer: boolean,
  playerImg: HTMLImageElement,
  playerPosX: number,
  playerPosY: number,
  playerScale: number,
  //============ player props above ============
  imageCache: { [key: string]: HTMLImageElement }
) => {
  const player = {
    objectName: "player",
    y: playerPosY / Math.floor(tileSize), // hack need to fix what ever makes this so big
    imageY: playerPosY,
    imageX: playerPosX,
    scale: playerScale,
    img: playerImg,
    imageCache: imageCache
  };

  const drawList = room.roomObjects
    ? [
        ...room.roomObjects,
        player,
        ...room.items.filter((item) => item.drawAboveObjects),
      ]
    : [player, ...room.items.filter((item) => item.drawAboveObjects)];

  drawList.sort((a, b) => a.y - b.y);

  drawList.forEach((obj) => {
    if ("img" in obj) {
      renderPlayer(
        ctx,
        tileSize,
        mirrorPlayer,
        obj.img,
        obj.imageX,
        obj.imageY,
        obj.scale
      );
    } else {
      // const img = new Image();
      // img.src = obj.image || "";
      // imageCache[obj.image] = img;
      const img = getImage(obj.image, imageCache);
      if (!img) {
        console.error("Image not found: ", obj.image);
        return;
      }
      
      ctx.drawImage(
        img,
        obj.x * tileSize + (obj.offset?.x || 0),
        obj.y * tileSize - obj.objectSize.height * tileSize + tileSize + (obj.offset?.y || 0),
        obj.objectSize.width * tileSize,
        obj.objectSize.height * tileSize
      );
    }
  });
};

const getImage = (image: string, imageCache: { [key: string]: HTMLImageElement }) => {
  if (imageCache[image]) {
    return imageCache[image];
  }
  const img = new Image();
  img.src = image;
  imageCache[image] = img;
  return img;
}

export const renderItems = (
  ctx: CanvasRenderingContext2D,
  tileSize: number,
  obj: Item,
  imageCache: { [key: string]: HTMLImageElement }
) => {
  const img = getImage(obj.image, imageCache);
  if (!img) {
    console.error("Image not found: ", obj.image);
    return;
  }

  ctx.drawImage(
    img,
    obj.x * tileSize + (obj.offset?.x || 0),
    obj.y * tileSize - obj.objectSize.height * tileSize + tileSize + (obj.offset?.y || 0),
    obj.objectSize.width * tileSize,
    obj.objectSize.height * tileSize    
  );
};
