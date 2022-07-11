// Tile Type

export type TileType = BoardTileType | NonBoardTileType;

export function getAllTileTypes(): TileType[] {
    const boardTileTypes = getAllBoardTileTypes();
    const nonBoardTileTypes = getAllNonBoardTileTypes();

    return [...boardTileTypes, ...nonBoardTileTypes];
}
// Board Tile Type

export type BoardTileType = BoardResourceTileType | BoardNonResourceTileType;

export function getAllBoardTileTypes() : BoardTileType[] {
    const resourceTileTypes = getAllBoardResourceTileTypes();
    const nonResourceTileTypes = getAllBoardNonResourceTileTypes();

    return [...resourceTileTypes, ...nonResourceTileTypes];
}

// Board Resource Tile Type

export enum BoardResourceTileType {
    Brick = "brick",
    Lumber = "lumber",
    Ore = "ore",
    Grain = "grain",
    Wool = "wool",
}

export function getAllBoardResourceTileTypes(): BoardResourceTileType[] {
    return Object.values(BoardResourceTileType) as BoardResourceTileType[];
}

// Board Non-Resource Tile Type

export enum BoardNonResourceTileType {
    Desert = "desert",
};

export function getAllBoardNonResourceTileTypes(): BoardNonResourceTileType[] {
    return Object.values(BoardNonResourceTileType) as BoardNonResourceTileType[];
}

// Non Board Tile Type

export enum NonBoardTileType {
    Void = "void",
}

export function getAllNonBoardTileTypes(): NonBoardTileType[] {
    return Object.values(NonBoardTileType) as NonBoardTileType[];
}
