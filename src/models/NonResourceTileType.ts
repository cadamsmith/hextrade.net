export enum NonResourceTileType {
    Desert = "desert",
    Empty = "empty",
};

export function getAllNonResourceTileTypes(): NonResourceTileType[] {
    return Object.values(NonResourceTileType) as NonResourceTileType[];
}