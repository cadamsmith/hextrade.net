import type { TilePosition } from "./TilePosition";
import type { TileType } from "./TileType";

export class TileData {
    tileType: TileType;
    
    hasScore: boolean;
    score: number;

    position: TilePosition;

    isEditable: boolean;
    isEditing: boolean;

    constructor(tileType: TileType, score: number, position: TilePosition, isEditable: boolean) {
        this.tileType = tileType;

        this.hasScore = score == 0;
        this.score = score;

        this.position = position;

        this.isEditable = isEditable;
        this.isEditing = false;
    }
}