import { playerAsset } from "../../assets/playerAsset";

import type { Item, Player, Room } from "../../Types/types";
import {
  playerPoint,
  renderGrid,
  renderPlayerRegion,
  renderRoomBlockRegions,
  renderRoomObjectBlockRegions,
} from "./debugCanvas";
import { renderPlayer } from "./playerCanvas";
import { renderRoomObjects } from "./roomObjectsCanvas";

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

const { playerImg } = playerAsset();

// Cache for background images
const backgroundImageCache: { [key: string]: HTMLImageElement } = {};

const getBackgroundImage = (backgroundImage: string): HTMLImageElement => {
  if (backgroundImageCache[backgroundImage]) {
    return backgroundImageCache[backgroundImage];
  }

  const img = new Image();
  img.src = backgroundImage;
  backgroundImageCache[backgroundImage] = img;
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

  // Objects
  currentRoom.items.forEach((obj: Item) => {
    ctx.fillStyle = obj.color || "yellow";
    ctx.fillRect(obj.x! * tileSize, obj.y! * tileSize, tileSize, tileSize);
  });

  if (debugRenderRoomBlock) renderRoomBlockRegions(currentRoom, ctx, tileSize);
  if (debugRenderGrid) renderGrid(ctx, canvasWidth, canvasHeight, tileSize);
  if (debugRenderPlayerRegion)
    renderPlayerRegion(currentRoom, ctx, player, tileSize);
  if (debugRenderRoomObjectBlock)
    renderRoomObjectBlockRegions(currentRoom, ctx, tileSize);

  // Room Objects
  renderRoomObjects(currentRoom, ctx, tileSize);

  // Player
  if (debugRenderPlayerPoint) playerPoint(ctx, player, tileSize);

  renderPlayer(
    ctx,
    tileSize,
    mirrorPlayer,
    playerImg,
    playerPosX,
    playerPosY,
    playerScale
  );
};
