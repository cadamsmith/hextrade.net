export class TilePosition {
    x: number;
    y: number;

    isBoardTilePosition: boolean;

    constructor(x: number, y: number, isBoardTilePosition: boolean) {
        this.x = x;
        this.y = y;

        this.isBoardTilePosition = isBoardTilePosition;
    }

    getCoordinates() {
        return [this.x, this.y];
    }

    update(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    addToBoard() {
        this.isBoardTilePosition = true;
    }
}