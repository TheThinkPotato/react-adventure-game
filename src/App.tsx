import { useEffect, useRef, useState } from "react";
import { command } from "./command/Command";
import { keyboardControls } from "./Helpers/keyboard";
import TextConsole from "./Components/TextConsole";
import { drawCanvas } from "./Helpers/canvas";
import { initialRoom } from "./Rooms/rooms";
import { usePlayerContext } from "./context/PlayerContext";

const tileSize = 10;
const canvasWidth = 960;
const canvasHeight = 540;

export default function App() {
  const { player, setPlayer, mirrorPlayer, setMirrorPlayer } =
    usePlayerContext();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState("");
  const [log, setLog] = useState<string[]>([]);
  const tickCountRef = useRef(0);
  const currentRoomRef = useRef(initialRoom);

  const draw = (ctx: CanvasRenderingContext2D) => {
    drawCanvas({
      ctx,
      player,
      currentRoom: currentRoomRef.current,
      canvasWidth,
      canvasHeight,
      tileSize,
      mirrorPlayer,
    });
  };

  // set player position to initial player position
  useEffect(() => {
    if (
      currentRoomRef.current.initialPlayerPosition?.x !== undefined &&
      currentRoomRef.current.initialPlayerPosition?.y !== undefined
    ) {
      setPlayer({
        x: currentRoomRef.current.initialPlayerPosition.x,
        y: currentRoomRef.current.initialPlayerPosition.y,
        items: [],
        playerRegion: currentRoomRef.current.playerRegion,
      });
    }
  }, [setPlayer, currentRoomRef.current.initialPlayerPosition]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player]);

  // Keyboard Controls
  useEffect(() => {
    return keyboardControls({
      setPlayer,
      player,
      e: new KeyboardEvent("keydown"),
      canvasHeight,
      canvasWidth,
      tileSize,
      playerRegion: currentRoomRef.current.playerRegion,
      setMirrorPlayer,
      room: currentRoomRef.current,
    });
  }, [player, setMirrorPlayer, setPlayer, currentRoomRef.current.playerRegion]);

  const handleCommand = () => {
    const response = command(
      input.toLowerCase(),
      player,
      currentRoomRef.current
    );

    setLog((prev) => [...prev, "> " + input, response]);
    setInput("");
  };

  return (
    <article className="mx-auto flex justify-center items-center h-screen">
      <div className="flex flex-col items-center bg-black p-4 w-screen">
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
