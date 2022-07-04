export class BoardTilePosition {
    readonly x: number;
    readonly y: number;
    readonly isGameTilePosition: boolean;

    constructor(x: number, y: number, isGameTilePosition: boolean) {
        if (x < 0 || y < 0) {
            throw new Error("x and y must be positive.");
        }

        this.x = x;
        this.y = y;
        this.isGameTilePosition = isGameTilePosition;
    }
}