import type { Item, Player, Room } from "../Types/types";

export const command = (input:string, player:Player, initialRoom:Room) => {

    const lower = input.toLowerCase();
    let response = "I don't understand that.";

    if (lower.includes("pick") || lower.includes("take") && lower.includes("red keycard")) {
      const obj: Item | undefined = initialRoom.items.find((o) => o.name === "red keycard");
      if (obj && obj.x === player.x && obj.y === player.y) {
        response = "You picked up the red keycard!";
        initialRoom.items = initialRoom.items.filter((o) => o.name !== "red keycard");
        player.items = player.items || [];        
        player.items.push(obj);
        console.log("player.items: ", player.items);
        initialRoom.description = "You are in a room the room is empty.";
      } else {
        response = "There's no keycard here.";
      }
    }

    if (lower.includes("inventory") || lower.includes("inv")) {
        console.log("player.items: ", player.items);
        if (player.items && player.items.length > 0) {
            response = "You are carrying: " + player.items.map((i) => i.name).join(", ");
        } else {
            response = "You are not carrying anything.";
        }
    }

    if (lower.includes("look")) {
        response = initialRoom.description || "You see nothing special.";
    }

    if (lower.includes("help")) {
        response = "You can use the following commands: \n\n" +
            "LOOK: Look around the room\n" +
            "PICK: Pick up an item\n" +
            "TAKE: Take an item\n" +
            "INV: Check your inventory\n" +
            "HELP: Show this help message";
    }

    return response;
}