import type { Room } from "../Types/types";

export const initialRoom: Room = {
    exits: ["north", "south", "east", "west"],
    items: [{ name: "red keycard", x: 15, y: 25, color: "red" }],
    initialPlayerPosition: { x: 70, y: 32 },
    description: "You are in a room with a keycard on the floor.",
  };