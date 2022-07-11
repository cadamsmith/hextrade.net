import type { BoardTileType } from "../Tile/TileType";

/**
 * Lists out all of the tiles that are to receive score markers, with their types and counts
 */
export class ScoredTileTypeCensus {
    private _data: Record<BoardTileType, number>;

    /**
     * Creates a new ScoredTileTypeCensus instance
     */
     constructor(resourceCounts: Record<BoardTileType, number>) {
        this._data = resourceCounts;
    }

    /**
     * @param tileType The resource tile type to count
     * @returns how many of the specific tile type there are
     */
    count(tileType: BoardTileType): number {
        return this._data[tileType];
    }

    /**
     * @returns the total number of resource tile types, i.e. the sum of all the counts
     */
    totalCount(): number {
        return Object.values(this._data).reduce((a, b) => a + b, 0);
    }

    /**
     * @returns a flattened array of the resource tile types, i.e. each tile type repeated n times, where n is its count
     */
    flatten(): BoardTileType[] {
        let flattened: BoardTileType[] = [];

        // loop through every resource tile type included in this census
        for (let tileType of Object.keys(this._data) as BoardTileType[]) {
            const count = this._data[tileType];

            // push each nonresource tile type n times, where n is its count
            for (let i = 0; i < count; i++) {
                flattened.push(tileType);
            }
        }
        
        return flattened;
    }
}