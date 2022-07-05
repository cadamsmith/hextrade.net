import type { TileType } from "./TileType";

interface TileDataParams {
    tileType: TileType;
    score: number;
    isEditable: boolean;
    isEditing: boolean;
}

export class TileData {
    tileType: TileType;
    score: number;
    isEditable: boolean;
    isEditing: boolean;
    
    constructor({tileType, score, isEditable, isEditing}: TileDataParams) {
        this.tileType = tileType;
        this.score = score;
        this.isEditable = isEditable;
        this.isEditing = isEditing;
    }
}