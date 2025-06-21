import type { Item, Player, Region, Room } from "../Types/types";

const listDisplayedItemsInRoom = (room: Room) => {
  return room.items.filter((i) => i.displayedInDescription);
};

const isPlayerInRangeOffRegion = (player: Player, region: Region) => {
  // Check if player region overlaps with the target region

  const playerOverlapsRegion =
    player.playerRegion.startCoord.x <= region.endCoord.x -1 &&
    player.playerRegion.endCoord.x + 1 >= region.startCoord.x &&
    player.playerRegion.startCoord.y <= region.endCoord.y &&
    player.playerRegion.endCoord.y >= region.startCoord.y;

  return playerOverlapsRegion;
};

const isPlayerInRangeOfObject = (player: Player, obj: Item) => {
  return (
    obj.x !== undefined &&
    obj.y !== undefined &&
    obj.x >= player.playerRegion.startCoord.x &&
    obj.x <= player.playerRegion.endCoord.x &&
    obj.y >= player.playerRegion.startCoord.y &&
    obj.y <= player.playerRegion.endCoord.y
  );
};

export const command = (input: string, player: Player, room: Room) => {
  const lowerCasedInput = input.toLowerCase();
  let response = "I don't understand that.";

  // Check if input contains "pick" or "take" and any item name from the room
  const mentionedItem = room.items.find((item) =>
    lowerCasedInput.includes(item.objectName.toLowerCase())
  );

  if (lowerCasedInput.includes("open") && lowerCasedInput.includes("door")) {
    const nearDoor = room.roomExits?.find((exit) => {
      return isPlayerInRangeOffRegion(player, exit);
    });

    if (nearDoor) {
      nearDoor.isOpen = true;
      response = `You opened the ${nearDoor.objectName}!`;
      console.log("nearDoor: ", nearDoor);
    }
  }

  if (lowerCasedInput.includes("close") && lowerCasedInput.includes("door")) {
    const nearDoor = room.roomExits?.find((exit) => {
      return isPlayerInRangeOffRegion(player, exit);
    });

    if (nearDoor) {
      nearDoor.isOpen = false;
      response = `You closed the ${nearDoor.objectName}!`;
      console.log("nearDoor: ", nearDoor);
    }
  }

  if (
    lowerCasedInput.includes("pick") ||
    (lowerCasedInput.includes("take") && mentionedItem)
  ) {
    const obj: Item | undefined = mentionedItem;
    if (!player.playerRegion || !obj) {
      return "";
    }
    const isInPlayerRange = isPlayerInRangeOfObject(player, obj);

    if (isInPlayerRange) {
      response = `You picked up the ${obj.objectName}!`;
      room.items = room.items.filter((o) => o.objectName !== obj.objectName);
      player.items = [...(player.items || []), obj];
      obj.isPickedUp = true;
    } else {
      response = `There's no ${obj.objectName} here.`;
    }
  }

  if (
    lowerCasedInput.includes("inventory") ||
    lowerCasedInput.includes("inv")
  ) {
    if (player.items && player.items.length > 0) {
      response =
        "You are carrying: " + player.items.map((i) => i.objectName).join(", ");
    } else {
      response = "You are not carrying anything.";
    }
  }

  if (lowerCasedInput.includes("look")) {
    const displayedItems = listDisplayedItemsInRoom(room);
    response = room.description || "You see nothing special.";
    if (displayedItems.length > 0) {
      response +=
        "\n\nYou can see: " +
        displayedItems
          .map((i) => i.displayedItemDescription ?? i.objectName)
          .join(", ");
    }
    return response;
  }

  if (lowerCasedInput.includes("help")) {
    response =
      "You can use the following commands: \n\n" +
      "LOOK: Look around the room\n" +
      "PICK: Pick up an item\n" +
      "TAKE: Take an item\n" +
      "INV: Check your inventory\n" +
      "HELP: Show this help message\n" +
      "OPEN: Open a door or an item";
  }

  return response;
};
