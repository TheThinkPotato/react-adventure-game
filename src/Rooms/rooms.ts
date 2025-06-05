import type { Room } from "../Types/types";

export const initialRoom: Room = {
    exits: ["north", "south", "east", "west"],
    items: [{ name: "red keycard", x: 5, y: 5, color: "red" }],
    description: "You are in a room with a keycard on the floor.",
  };