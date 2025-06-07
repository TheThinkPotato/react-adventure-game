import { useEffect, useRef, useState } from "react";
import type { Player } from "./Types/types";
import { command } from "./command/Command";
import { initialRoom } from "./Rooms/rooms";
import { keyboardControls } from "./Helpers/keyboard";
import TextConsole from "./Components/TextConsole";
import { drawCanvas } from "./Helpers/canvas";

const tileSize = 32;
const canvasWidth = 640;
const canvasHeight = 480;

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [player, setPlayer] = useState<Player>({ x: 10, y: 7, items: [] });
  const [input, setInput] = useState("");
  const [log, setLog] = useState<string[]>([]);
  const tickCountRef = useRef(0);

  const draw = (ctx: CanvasRenderingContext2D) => {
    drawCanvas({
      ctx,
      player,
      initialRoom,
      canvasWidth,
      canvasHeight,
      tileSize
    });
  }

  const tick = () => {
    tickCountRef.current += 1;
  };

  // Game clock
  useEffect(() => {
    const interval = setInterval(tick, 500);
    return () => clearInterval(interval);
  }, []);


  // update canvas every time player moves
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (context) draw(context);
    console.log("player: ", player);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player]);

  // Keyboard Controls
  useEffect(() => {
    return keyboardControls({
      setPlayer,
      e: new KeyboardEvent("keydown"),
      canvasHeight,
      canvasWidth,
      tileSize,
    });
  }, []);

  const handleCommand = () => {
    const response = command(input.toLowerCase(), player, initialRoom);

    setLog((prev) => [...prev, "> " + input, response]);
    setInput("");
  };

  return (
    <article className="mx-auto flex justify-center items-center h-screen">
      <div className="flex flex-col items-center bg-black p-4 w-2/3">
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          className="border border-white mb-4"
          onFocus={() => {
            inputRef.current?.focus();
          }}
          onMouseDown={() => {
            inputRef.current?.focus();
          }}
        />
        <TextConsole
          log={log}
          input={input}
          setInput={setInput}
          handleCommand={handleCommand}
          inputRef={inputRef as React.RefObject<HTMLInputElement>}
        />
      </div>
    </article>
  );
}
