import { tileSize } from "../App";

export const handleMouseLeftClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (e.button === 0) {
      const canvas = e.currentTarget;
      const rect = canvas.getBoundingClientRect();
      // Get mouse position relative to the canvas
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // Calculate grid coordinates
      const xTile = Math.floor(x / tileSize);
      const yTile = Math.floor(y / tileSize);
      console.log("Grid square:", xTile, yTile);
    }
  };
