export type Player = {
    objectName: "player";
    x: number;
    y: number;
    items: Item[];
    playerRegion?: Region;
}

export type Room = {
    backgroundImage: string;
    exits: string[];
    items: Item[];
    description?: string;
    initialPlayerPosition?: { x: number; y: number };   
    playerScale: number;
    playerRegionSize: Region;
    blockRegions: Region[];
    roomObjects?: RoomObject[];
    roomExits?: RoomExitRegion[];
}

export type Item = {
    objectName: string;
    itemId: string;
    x: number;
    y: number;
    offset?: Coord;
    image: string;
    objectSize: ObjectSize;
    drawAboveObjects: boolean;
    displayedInDescription: boolean;
    displayedItemDescription?: string;  
    isPickedUp?: boolean;
}

export type Region = {
    startCoord: Coord;
    endCoord: Coord;
}

export type Coord = {
    x: number;
    y: number;
}

export type ObjectSize = {
    width: number;
    height: number;
}

export type RoomObject = {
    objectName: string;
    objectSize: ObjectSize;
    image: string;
    x: number;
    y: number;
    offset?: Coord;
    color?: string;
    description?: string;
    isLocked?: boolean;
    isOpen?: boolean;
    isVisible?: boolean;
    blockRegions?: Region[];
}

export type RoomExitRegion = {
    startCoord: Coord;
    endCoord: Coord;
    targetRoomIndex: number;
}