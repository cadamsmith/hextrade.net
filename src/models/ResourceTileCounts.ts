import type { ResourceTileType } from "./ResourceTileType";

export class ResourceTileCounts {
    _data: Record<ResourceTileType, number>;

    constructor(resourceCounts: Record<ResourceTileType, number>) {
        this._data = resourceCounts;
    }

    count(tileType: ResourceTileType): number {
        return this._data[tileType];
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