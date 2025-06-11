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
}

export type Item = {
    name: string;
    color?: string;
    x?: number;
    y?: number;
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
    color?: string;
    description?: string;
    isLocked?: boolean;
    isOpen?: boolean;
    isVisible?: boolean;
    blockRegions?: Region[];

}
