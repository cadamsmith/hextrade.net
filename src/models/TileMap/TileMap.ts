import { shuffle } from "../../utilities/ArrayHelpers";
import { TileData } from "../Tile/TileData";
import { TilePosition } from "../Tile/TilePosition";
import { NonBoardTileType, type BoardTileType } from "../Tile/TileType";
import type { TileMapConfig } from "./TileMapConfig";
import { TileRowIndentationScheme } from "./TileRowIndentationScheme";

export class TileMap {
    _data: TileData[][];
    tileRowIndentationScheme: TileRowIndentationScheme;

    constructor(config: TileMapConfig)
    {
        let scores = config.tileScoreCounts.flatten();
        let scoredTileTypes = config.scoredTileTypeCounts.flatten();
        let nonScoredTileTypes = config.nonScoredTileTypeCounts.flatten();

        scores = shuffle(scores);
        scoredTileTypes = shuffle(scoredTileTypes);

        let boardTiles : [tileType: BoardTileType, score: number][] = [];
        for (let i = 0; i < scoredTileTypes.length; i++) {
            boardTiles.push([scoredTileTypes[i], scores[i]]);
        }
        for (let i = 0; i < nonScoredTileTypes.length; i++) {
            boardTiles.push([nonScoredTileTypes[i], 0]);
        }
        boardTiles = shuffle(boardTiles);

        let data = new Array<TileData[]>();
        for (let position of config.tilePositions) {
            const [x, y] = position.getCoordinates();

            if (data.length <= x) {
                for (let i = 0; i < x - data.length + 1; i++) {
                    data.push(new Array<TileData>());
                }
            }

            if (data[x].length < y) {
                for (let i = 0; i < y - data[x].length + 1; i++) {
                    const position = new TilePosition(x, i, false);
                    const tileData = new TileData(NonBoardTileType.Void, 0, position, false);

                    data[x].push(tileData);
                }
            }

            if (position.isBoardTilePosition) {
                const [tileType, score] = boardTiles.pop();
                const tileData = new TileData(tileType, score, position, true);

                data[x].push(tileData);
            }
            else {
                const tileData = new TileData(NonBoardTileType.Void, 0, position, true);

                data[x].push(tileData);
            }
        }

        this._data = data;
        this.tileRowIndentationScheme = config.tileRowIndentationScheme;
    }

    startEditing() {
        for (let y = 0; y < this._data.length; y++) {
            for (let x = 0; x < this._data[y].length; x++) {
                if (this._data[y][x].isEditable) {
                    this._data[y][x].isEditing = true;
                }
            }
        }
    }

    stopEditing() {
        for (let y = 0; y < this._data.length; y++) {
            for (let x = 0; x < this._data[y].length; x++) {
                this._data[y][x].isEditing = false;
            }
        }
    }

    isRowIndented(x: number) {
        if (this.tileRowIndentationScheme == TileRowIndentationScheme.Odd) {
            return x % 2 == 0;
        }
        else {
            return x % 2 == 1;
        }
    }

    getNeighbors(position: TilePosition): number[][] {
        const [x, y] = position.getCoordinates();

        const isIndentedRow = this.isRowIndented(x);

        let neighbors = [
            [x - 1, y], [x, y - 1], [x, y + 1], [x + 1, y]
        ];

        if (isIndentedRow) {
            neighbors.push([x - 1, y + 1], [x + 1, y + 1]);
        }
        else {
            neighbors.push([x - 1, y - 1], [x + 1, y - 1]);
        }

        return neighbors.sort(([x1, y1], [x2, y2]) => x1 - x2 || y1 - y2);
    }

    swapIndentationScheme() {
        if (this.tileRowIndentationScheme == TileRowIndentationScheme.Odd) {
            this.tileRowIndentationScheme = TileRowIndentationScheme.Even;
        }
        else {
            this.tileRowIndentationScheme = TileRowIndentationScheme.Odd;
        }
    }

    shiftDown() {
        for (let i = 0; i < this._data.length; i++) {
            for (let j = 0; j < this._data[i].length; j++) {
                this._data[i][j].position.update(i + 1, j);
            }
        }

        const newTopRow : TileData[] = [];
        this._data.unshift(newTopRow);
    }

    expandDown() {
        const newBottomRow : TileData[] = [];
        this._data.push(newBottomRow);
    }

    shiftRight() {
        for (let i = 0; i < this._data.length; i++) {
            for (let j = 0; j < this._data[i].length; j++) {
                this._data[i][j].position.update(i, j + 1);
            }

            const position = new TilePosition(i, 0, false);
            this._data[i].unshift(new TileData(NonBoardTileType.Void, 0, position, false));
        }
    }

    handleAddTile(position: TilePosition) {
        let [x, y] = position.getCoordinates();

        this._data[x][y].position.addToBoard();

        if (x == 0) {
            this.swapIndentationScheme();

            this.shiftDown();

            x++;
        }
        if (y == 0) {
            this.shiftRight();

            y++;
        }
        if (x == this._data.length - 1) {
            this.expandDown();
        }

        const neighbors = this.getNeighbors(new TilePosition(x, y, true));

        for (let [x, y] of neighbors) {
            const rowLength = this._data[x].length;
            for (let i = rowLength; i <= y; i++) {
                const position = new TilePosition(x, i, false);
                const tileData = new TileData(NonBoardTileType.Void, 0, position, false);

                this._data[x].push(tileData);
            }

            this._data[x][y].isEditable = true;
            this._data[x][y].isEditing = true;
        }
    }
}