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

    flatten(): NonResourceTileType[] {
        let flattened: NonResourceTileType[] = [];
        for (let index of Object.keys(this._data)) {
            const nonResourceTileType : NonResourceTileType = parseInt(index);
            const count = this._data[nonResourceTileType];

            for (let i = 0; i < count; i++) {
                flattened.push(nonResourceTileType);
            }
        }
        
        return flattened;
    }
}