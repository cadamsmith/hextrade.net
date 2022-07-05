import type { NonResourceTileType } from "./NonResourceTileType";

export class NonResourceTileCounts {
    _data: Record<NonResourceTileType, number>;

    constructor(nonResourceTileCounts: Record<NonResourceTileType, number>) {
        this._data = nonResourceTileCounts;
    }

    count(nonResourceTileType: NonResourceTileType): number {
        return this._data[nonResourceTileType];
    }

    totalCount(): number {
        return Object.values(this._data).reduce((a, b) => a + b, 0);
    }

    flatten(): string[] {
        let flattened: string[] = [];
        for (let index of Object.keys(this._data)) {
            const count = this._data[index];

            for (let i = 0; i < count; i++) {
                flattened.push(index);
            }
        }
        
        return flattened;
    }
}