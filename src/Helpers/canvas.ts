import { playerAsset } from "../assets/playerAsset";
import type { item, Player, Room } from "../Types/types";

interface Canvas {
  ctx: CanvasRenderingContext2D;
  player: Player;
  initialRoom: Room;
  canvasWidth: number;
  canvasHeight: number;
  tileSize: number;
}

const { playerImg, playerScale } = playerAsset();

export const drawCanvas = ({
  ctx,
  player,
  initialRoom,
  canvasWidth,
  canvasHeight,
  tileSize,
}: Canvas) => {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  // Room
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Objects
  initialRoom.items.forEach((obj: item) => {
    ctx.fillStyle = obj.color || "yellow";
    ctx.fillRect(obj.x! * tileSize, obj.y! * tileSize, tileSize, tileSize);
  });

  console.log(player.x, player.y, tileSize, playerScale);

  // Player
  ctx.fillStyle = "#0f0";
  ctx.fillRect(player.x * tileSize, player.y * tileSize, tileSize, tileSize);
  ctx.drawImage(
    playerImg,
    player.x * tileSize + (tileSize / 2 * playerScale + (tileSize / 2)),
    player.y * tileSize + (tileSize / 2),
    tileSize * -playerScale,
    tileSize * -playerScale
  );
};
