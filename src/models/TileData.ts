import type { TileType } from "./TileType";

interface TileDataParams {
    tileType: TileType;
    score: number;
    isEditable: boolean;
}

export class TileData {
    tileType: TileType;
    score: number;
    isEditable: boolean;
    
    constructor({tileType, score, isEditable}: TileDataParams) {
        this.tileType = tileType;
        this.score = score;
        this.isEditable = isEditable;
    }

    toString(): string {
        return `${this.tileType} ${this.score} ${this.isEditable}`;
    }
}