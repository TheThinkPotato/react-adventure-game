export type Player = {
    x: number;
    y: number;
    items: item[];
}

export type Room = {
    exits: string[];
    items: item[];
    description?: string;
    initialPlayerPosition?: { x: number; y: number };    
}

export type item = {
    name: string;
    color?: string;
    x?: number;
    y?: number;
}
