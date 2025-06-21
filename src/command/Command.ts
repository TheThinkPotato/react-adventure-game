import type { Item, Player, Room } from "../Types/types";
import {
  isPlayerInRangeOffRegion,
  isPlayerInRangeOfObject,
  syncAllRoomExits,
} from "./commandHelpers";

const listDisplayedItemsInRoom = (room: Room) => {
  return room.items.filter((i) => i.displayedInDescription);
};

export const command = (input: string, player: Player, room: Room) => {
  const lowerCasedInput = input.toLowerCase();
  let response = "I don't understand that.";

  const nearExit = room.roomExits?.find((exit) =>
    isPlayerInRangeOffRegion(player, exit)
  );

  // Check if input contains "pick" or "take" and any item name from the room
  const mentionedItem = room.items.find((item) =>
    lowerCasedInput.includes(item.objectName.toLowerCase())
  );

  if (
    lowerCasedInput.includes("open") &&
    nearExit &&
    lowerCasedInput.includes(nearExit?.objectName.toLowerCase())
  ) {
    if (nearExit) {
      nearExit.isOpen = true;
      if (nearExit.exitLinkId) {
        syncAllRoomExits({ exitLinkId: nearExit.exitLinkId, isOpen: true });
      }
      response = `You opened the ${nearExit.objectName}!`;
    }
  }

  if (
    lowerCasedInput.includes("close") &&
    nearExit &&
    lowerCasedInput.includes(nearExit?.objectName.toLowerCase())
  ) {
    if (nearExit) {
      nearExit.isOpen = false;
      if (nearExit.exitLinkId) {
        syncAllRoomExits({ exitLinkId: nearExit.exitLinkId, isOpen: false });
      }
      response = `You closed the ${nearExit.objectName}!`;
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
