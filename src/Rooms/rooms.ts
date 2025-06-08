import type { Room } from "../Types/types";

export const initialRoom: Room = {
  backgroundImage: "/assets/rooms/initialRoom.jpg",
  exits: ["north", "south", "east", "west"],
  items: [{ name: "red keycard", x: 15, y: 45, color: "red" }],
  initialPlayerPosition: { x: 70, y: 32 },
  description:
    "You are in a server room. On the walls you can see a machine with a lot of numbers and lights. There is a red keycard on the floor.",
  playerScale: 16,
  playerRegion: { startCoord: { x: 0, y: 0 }, endCoord: { x: 10, y: 4 } },
};
