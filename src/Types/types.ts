export type Player = {
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
    playerRegion: Region;
    blockRegions: Region[];
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
