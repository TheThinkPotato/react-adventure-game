import { playerAsset } from "../assets/playerAsset";

import type { Item, Player, Region, Room } from "../Types/types";

interface Canvas {
  ctx: CanvasRenderingContext2D;
  player: Player;
  currentRoom: Room;
  canvasWidth: number;
  canvasHeight: number;
  tileSize: number;
  mirrorPlayer: boolean;
}

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
  if (backgroundImage.complete) {
    ctx.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight);
  }

  // Objects
  currentRoom.items.forEach((obj: Item) => {
    ctx.fillStyle = obj.color || "yellow";
    ctx.fillRect(obj.x! * tileSize, obj.y! * tileSize, tileSize, tileSize);
  });

  // Draw the block regions on the background image
  currentRoom.blockRegions.forEach((region: Region) => {
    ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
    for (let x = region.startCoord.x; x <= region.endCoord.x; x++) {
      for (let y = region.startCoord.y; y <= region.endCoord.y; y++) {
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      }
    }
  });

  // Draw the player region on the background image
  if (player.playerRegion) {
    ctx.fillStyle = "rgba(0, 0, 255, 0.2)";
    const width =
      (player.playerRegion.endCoord.x - player.playerRegion.startCoord.x + 1) *
      tileSize;
    const height =
      (player.playerRegion.endCoord.y - player.playerRegion.startCoord.y + 1) *
      tileSize;
    ctx.fillRect(
      player.playerRegion.startCoord.x * tileSize +
        player.x * tileSize -
        (player.playerRegion.endCoord.x / 2) * tileSize,
      player.playerRegion.startCoord.y * tileSize +
        player.y * tileSize -
        (player.playerRegion.endCoord.y / 2) * tileSize,
      width,
      height
    );
  }

  // Player
  ctx.fillStyle = "#0f0";
  ctx.fillRect(player.x * tileSize, player.y * tileSize, tileSize, tileSize);

  // if mirrorPlayer is true, flip the image
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
