import type { item, Player, Room } from "../Types/types";

interface Canvas {
    ctx: CanvasRenderingContext2D;
    player: Player;
    initialRoom: Room;
    canvasWidth: number;
    canvasHeight: number;
    tileSize: number;

}

export const drawCanvas = ({ctx, player, initialRoom, canvasWidth, canvasHeight, tileSize}: Canvas) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    // Room
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    // Player
    ctx.fillStyle = "#0f0";
    ctx.fillRect(player.x * tileSize, player.y * tileSize, tileSize, tileSize);
    // Objects
    initialRoom.items.forEach((obj: item) => {
      ctx.fillStyle = obj.color || "yellow";
      ctx.fillRect(obj.x! * tileSize, obj.y! * tileSize, tileSize, tileSize);
    });
  };