import type { Room } from "../Types/types";

export const initialRoom: Room = {
  backgroundImage: "/assets/rooms/initialRoom.jpg",
  exits: ["north", "south", "east", "west"],
  items: [
    {
      objectName: "red keycard",
      x: 14,
      y: 40,
      offset: { x: 0, y: 7 },
      drawAboveObjects: false,
      objectSize: { width: 1, height: 1 },
      image: "/assets/objects/keycardRed.png",
    },
  ],
  initialPlayerPosition: { x: 90, y: 35 },
  description:
    "You are in a server room. On the walls you can see a machine with a lot of numbers and lights. There is a red keycard on the floor.",
  playerScale: 16,
  playerRegionSize: { startCoord: { x: 0, y: 0 }, endCoord: { x: 10, y: 4 } },
  blockRegions: [
    { startCoord: { x: 0, y: 0 }, endCoord: { x: 96, y: 25 } },
    { startCoord: { x: 90, y: 26 }, endCoord: { x: 96, y: 27 } },
  ],
  roomObjects: [
    {
      objectName: "computerRack2",
      image: "/assets/objects/computerRack.png",
      objectSize: { width: 16, height: 32 },
      x: 5,
      y: 40,
      blockRegions: [
        { startCoord: { x: 5, y: 35 }, endCoord: { x: 20, y: 40 } },
      ],
    },
    {
      objectName: "computerRack1",
      image: "/assets/objects/computerRack.png",
      objectSize: { width: 16, height: 32 },
      x: 20,
      y: 40,
      blockRegions: [
        { startCoord: { x: 20, y: 35 }, endCoord: { x: 35, y: 40 } },
      ],
    },
  ],
  roomExits: [
    { startCoord: { x: 91, y: 41 }, endCoord: { x: 95, y: 50}, targetRoomIndex: 1 },
  ],
};

export const nextRoom: Room = {
  backgroundImage: "/assets/rooms/initialRoom.jpg",
  exits: ["north", "south", "east", "west"],
  items: [],
  initialPlayerPosition: { x: 90, y: 35 },
  description:
    "You are in a server room. On the walls you can see a machine with a lot of numbers and lights. There is a red keycard on the floor.",
  playerScale: 16,
  playerRegionSize: { startCoord: { x: 0, y: 0 }, endCoord: { x: 10, y: 4 } },
  blockRegions: [
    { startCoord: { x: 0, y: 0 }, endCoord: { x: 96, y: 25 } },
    { startCoord: { x: 90, y: 26 }, endCoord: { x: 96, y: 27 } },
  ],
  roomObjects: [],
  roomExits: [
    { startCoord: { x: 0, y: 31 }, endCoord: { x: 6, y: 42}, targetRoomIndex: 0 },
  ],
};
