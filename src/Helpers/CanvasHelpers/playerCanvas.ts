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