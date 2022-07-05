import { getAllResourceTileTypes, type ResourceTileType } from "./ResourceTileType";
import { getAllNonResourceTileTypes, type NonResourceTileType } from "./NonResourceTileType";

export type TileType = ResourceTileType | NonResourceTileType;

export function getAllTileTypes(): TileType[] {
    const resourceTileTypes = getAllResourceTileTypes();
    const nonResourceTileTypes = getAllNonResourceTileTypes();

    return [...resourceTileTypes, ...nonResourceTileTypes];
}