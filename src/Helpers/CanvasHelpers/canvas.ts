import { playerAsset } from "../../assets/playerAsset";

import type { Item, Player, Room } from "../../Types/types";
import {
  playerPoint,
  renderGrid,
  renderPlayerRegion,
  renderRoomBlockRegions,
  renderRoomExits,
  renderRoomObjectBlockRegions,
} from "./debugCanvas";
import {
  renderItems,
  renderObjects,
} from "./roomPlayerObjectsCanvas";

interface Canvas {
  ctx: CanvasRenderingContext2D;
  player: Player;
  currentRoom: Room;
  canvasWidth: number;
  canvasHeight: number;
  tileSize: number;
  mirrorPlayer: boolean;
}

const debugRenderRoomBlock = false;
const debugRenderRoomObjectBlock = false;
const debugRenderGrid = false;
const debugRenderPlayerRegion = true;
const debugRenderPlayerPoint = true;
const debugRenderRoomExits = true;

const { playerImg } = playerAsset();

// Cache for background images
const imageCache: { [key: string]: HTMLImageElement } = {};

const getBackgroundImage = (backgroundImage: string): HTMLImageElement => {
  if (imageCache[backgroundImage]) {
    return imageCache[backgroundImage];
  }

  const img = new Image();
  img.src = backgroundImage;
  imageCache[backgroundImage] = img;
  return img;
};

export const drawCanvas = ({
  ctx,
  player,
  currentRoom,
  canvasWidth,
  canvasHeight,
  tileSize,
  mirrorPlayer,
}: Canvas) => {
  const playerScale = currentRoom.playerScale;
  const backgroundImage = getBackgroundImage(currentRoom.backgroundImage);

  const playerPosX =
    player.x * tileSize + ((tileSize / 2) * playerScale + tileSize / 2);
  const playerPosY = player.y * tileSize + tileSize / 2;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // Room
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Only draw the background image if it's loaded
  if (backgroundImage.complete)
    ctx.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight);

  // Items below objects Layer
  currentRoom.items.filter((obj: Item) => !obj.drawAboveObjects).forEach((obj: Item) => {
    renderItems(ctx, tileSize, obj, imageCache);
  });

  if (debugRenderRoomBlock) renderRoomBlockRegions(currentRoom, ctx, tileSize);
  if (debugRenderGrid) renderGrid(ctx, canvasWidth, canvasHeight, tileSize);
  if (debugRenderPlayerRegion)
    renderPlayerRegion(currentRoom, ctx, player, tileSize);
  if (debugRenderRoomObjectBlock)
    renderRoomObjectBlockRegions(currentRoom, ctx, tileSize);

  // PLayer and Objects Layer
  renderObjects(
    currentRoom,
    ctx,
    tileSize,
    mirrorPlayer,
    playerImg,
    playerPosX,
    playerPosY,
    playerScale,
    imageCache
  );  

  // Room Exits
  if (debugRenderRoomExits) renderRoomExits(currentRoom, ctx, tileSize);

  // Debug Player Point
  if (debugRenderPlayerPoint) playerPoint(ctx, player, tileSize);
};
