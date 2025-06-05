import { useEffect, useRef, useState } from "react";
import type { item, Player } from "./Types/types";
import { command } from "./command/Command";
import { initialRoom } from "./Rooms/rooms";

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

  const tick = () => {
    tickCountRef.current += 1;
  };


  useEffect(() => {
    const interval = setInterval(tick, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (context) draw(context);
    console.log("player: ", player);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setPlayer((prev) => {
        let { x, y } = prev;
        const items = prev.items || [];
        console.log("items: ", items);
        if (e.key === "ArrowUp") y = Math.max(0, y - 1);
        if (e.key === "ArrowDown")
          y = Math.min(canvasHeight / tileSize - 1, y + 1);
        if (e.key === "ArrowLeft") x = Math.max(0, x - 1);
        if (e.key === "ArrowRight")
          x = Math.min(canvasWidth / tileSize - 1, x + 1);
        return { x, y, items };
      });
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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
        <section className="w-full max-w-2xl p-0 bg-gray-800 text-white">
            <div className="p-2 h-34 overflow-y-auto" 
              onFocus={() => {
                inputRef.current?.focus();
              }}
               ref={(el) => {
               if (el) el.scrollTop = el.scrollHeight;
               }}>
            {log.slice(-5).map((line, idx) => (
              <div key={idx}>
                {line.split('\n').map((part, partIdx) => (
                  <div key={partIdx}>{part}</div>
                ))}
              </div>
            ))}
          </div>
          <div className="flex flex-row w-full bg-gray-900 text-white p-2">
            <div className="mr-2 animate-[flash_1s_ease-in-out_infinite]">{">"}</div>
            <input
              ref={inputRef}
              type="text"
              className="w-full focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCommand()}
            />
          </div>
        </section>
      </div>
    </article>
  );
}
