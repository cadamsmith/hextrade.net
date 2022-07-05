export enum ResourceTileType {
    Brick = "brick",
    Lumber = "lumber",
    Ore = "ore",
    Grain = "grain",
    Wool = "wool",
}

export function getAllResourceTileTypes(): ResourceTileType[] {
    return Object.values(ResourceTileType) as ResourceTileType[];
}