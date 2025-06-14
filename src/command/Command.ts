import type { Item, Player, Room } from "../Types/types";

export const command = (input: string, player: Player, initialRoom: Room) => {
  const lower = input.toLowerCase();
  let response = "I don't understand that.";

  if (
    lower.includes("pick") ||
    (lower.includes("take") && lower.includes("red keycard"))
  ) {
    const obj: Item | undefined = initialRoom.items.find(
      (o) => o.objectName === "red keycard"
    );
    if (!player.playerRegion) {
      return "";
    }
    const isInPlayerRange =
      obj?.x !== undefined &&
      obj?.y !== undefined &&
      obj.x >= player.playerRegion.startCoord.x &&
      obj.x <= player.playerRegion.endCoord.x &&
      obj.y >= player.playerRegion.startCoord.y &&
      obj.y <= player.playerRegion.endCoord.y;

    if (isInPlayerRange) {
      response = "You picked up the red keycard!";
      initialRoom.items = initialRoom.items.filter(
        (o) => o.objectName !== "red keycard"
      );
      player.items = [...(player.items || []), obj];
      initialRoom.description = "You are in a room the room is empty.";
    } else {
      response = "There's no keycard here.";
    }
  }

  if (lower.includes("inventory") || lower.includes("inv")) {
    console.log("player.items: ", player.items);
    if (player.items && player.items.length > 0) {
      response =
        "You are carrying: " + player.items.map((i) => i.objectName).join(", ");
    } else {
      response = "You are not carrying anything.";
    }
  }

  if (lower.includes("look")) {
    response = initialRoom.description || "You see nothing special.";
  }

  if (lower.includes("help")) {
    response =
      "You can use the following commands: \n\n" +
      "LOOK: Look around the room\n" +
      "PICK: Pick up an item\n" +
      "TAKE: Take an item\n" +
      "INV: Check your inventory\n" +
      "HELP: Show this help message";
  }

  return response;
};
