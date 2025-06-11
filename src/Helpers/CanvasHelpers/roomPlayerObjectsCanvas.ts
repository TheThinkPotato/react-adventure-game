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
  tileSize: number,  //============ player props below ============
  mirrorPlayer: boolean,
  playerImg: HTMLImageElement,
  playerPosX: number,
  playerPosY: number,
  playerScale: number
) => {

  const player = {
    objectName: "player",
    y: playerPosY / Math.floor(tileSize), // hack need to fix what ever makes this so big
    imageY: playerPosY,
    imageX: playerPosX,
    scale: playerScale,
    img: playerImg,
  }

  const drawList = room.roomObjects ? [...room.roomObjects, player] : [player];

  drawList.sort((a, b) => a.y - b.y);

  console.log("Sort: ",drawList);
  
  drawList.forEach(item => {
    console.log("Element: ", item.objectName, item.y);
  });
  
  drawList.forEach((obj) => {
    if ('img' in obj) {
      renderPlayer(ctx, tileSize, mirrorPlayer, obj.img, obj.imageX, obj.imageY, obj.scale);
    } else {
      const img = new Image();
      img.src = obj.image;
      ctx.drawImage(
        img,
        obj.x * tileSize,
        obj.y * tileSize - obj.objectSize.height * tileSize + tileSize,
        obj.objectSize.width * tileSize,
        obj.objectSize.height * tileSize      
      );
    }
  });
};