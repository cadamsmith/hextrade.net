export class ResourceTileScoreCounts {
    _scoreCounts: Record<number, number>;

    constructor(scoreCounts: Record<number, number>) {
        this._scoreCounts = scoreCounts;
    }

    count(score: number): number {
        return this._scoreCounts[score];
    }

    totalCount(): number {
        return Object.values(this._scoreCounts).reduce((a, b) => a + b, 0);
    }

    flatten(): number[] {
        let flattened: number[] = [];
        for (let index of Object.keys(this._scoreCounts)) {
            const score = parseInt(index);
            const count = this._scoreCounts[score];

            for (let i = 0; i < count; i++) {
                flattened.push(score);
            }
        }
        
        return flattened;
    }
}