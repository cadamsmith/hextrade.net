/**
 * Represents a list of tile scores, and how many of each there are
 */
export class TileScoreCensus {
    private _data: Record<number, number>;

    /**
     * Creates a new TileScoreCensus instance
     */
    constructor(scoreCounts: Record<number, number>) {
        this._data = scoreCounts;
    }

    /**
     * @param score The score to count
     * @returns how many of the specific score there are
     */
    count(score: number): number {
        return this._data[score];
    }

    /**
     * @returns the total number of scores, i.e. the sum of all the counts
     */
    totalCount(): number {
        return Object.values(this._data).reduce((a, b) => a + b, 0);
    }

    /**
     * @returns a flattened array of the scores, i.e. each score repeated the n times, where n is its count
     */
    flatten(): number[] {
        let flattened: number[] = [];

        // loop through every score included in this census
        for (let key of Object.keys(this._data)) {
            const score = parseInt(key);
            const count = this._data[score];

            // push each score n times, where n is its count
            for (let i = 0; i < count; i++) {
                flattened.push(score);
            }
        }
        
        return flattened;
    }
}