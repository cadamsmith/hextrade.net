import { shuffle } from "../utilities/ArrayHelpers";
import { TileData } from "./TileData";
import { ResourceTileType } from "./ResourceTileType";
import { NonResourceTileType } from "./NonResourceTileType";
import { ResourceTileCounts } from "./ResourceTileCounts";
import type { TileType } from "./TileType";
import { ResourceTileScoreCounts } from "./ResourceTileScoreCounts";
import { BoardTilePosition } from "./BoardTilePosition";
import { NonResourceTileCounts } from "./NonResourceTileCounts";

export class TileMap {
    _data: TileData[][];
    isFirstRowLeftJustified: boolean;

    constructor(config: TileMapConfig) {
        let scores = config.resourceTileScoreCounts.flatten();
        let resourceTypes = config.resourceTileCounts.flatten();
        let nonResourceTypes = config.nonResourceTileCounts.flatten();

        scores = shuffle(scores);
        resourceTypes = shuffle(resourceTypes);

        let tileDatas = new Array<TileData>();
        for (let i = 0; i < resourceTypes.length; i++) {
            tileDatas.push(
                new TileData({tileType: resourceTypes[i] as TileType, score: scores[i], isEditable: true, isEditing: false})
            );
        }
        for (let i = 0; i < nonResourceTypes.length; i++) {
            tileDatas.push(
                new TileData({tileType: nonResourceTypes[i] as TileType, score: 0, isEditable: true, isEditing: false})
            );
        }

        tileDatas = shuffle(tileDatas);

        let data = new Array<TileData[]>();
        for (let {x, y, isGameTilePosition} of config.tilePositions) {
            if (data.length <= y) {
                for (let i = 0; i < y - data.length + 1; i++) {
                    data.push(new Array<TileData>());
                }
            }

            if (data[y].length < x) {
                for (let i = 0; i < x - data[y].length + 1; i++) {
                    data[y].push(new TileData({tileType: NonResourceTileType.Empty, score: 0, isEditable: false, isEditing: false}));
                }
            }

            if (isGameTilePosition) {
                data[y].push(tileDatas.pop());
            }
            else {
                data[y].push(new TileData({tileType: NonResourceTileType.Empty, score: 0, isEditable: false, isEditing: false}));
            }
        }

        this._data = data;
        this.isFirstRowLeftJustified = config.isFirstRowLeftJustified;
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

    setTileType(x: number, y: number, tileType: TileType) {
        this._data[y][x].tileType = tileType;
    }

    setScore(x: number, y: number, score: number) {
        this._data[y][x].score = score;
    }

    getData(): TileData[][] {
        return this._data;
    }
}

interface TileMapConfigParams {
    gameTilePositions: BoardTilePosition[];
    expansionTilePositions: BoardTilePosition[];
    
    resourceTileCounts: ResourceTileCounts;
    resourceTileScoreCounts: ResourceTileScoreCounts;

    nonResourceTileCounts: NonResourceTileCounts;

    isFirstRowLeftJustified: boolean;
}

export class TileMapConfig {
    readonly tilePositions: BoardTilePosition[];

    readonly resourceTileCounts: ResourceTileCounts;
    readonly resourceTileScoreCounts: ResourceTileScoreCounts;
    
    readonly nonResourceTileCounts: NonResourceTileCounts;

    readonly isFirstRowLeftJustified: boolean;

    constructor({gameTilePositions, expansionTilePositions, resourceTileCounts, resourceTileScoreCounts, nonResourceTileCounts, isFirstRowLeftJustified} : TileMapConfigParams) {
        const boardTilePositionCount = gameTilePositions.flat().length;
        
        const resourceTileCount = resourceTileCounts.totalCount();
        const resourceTileScoreCount = resourceTileScoreCounts.totalCount();

        const nonResourceTileCount = nonResourceTileCounts.totalCount();

        if (boardTilePositionCount != resourceTileCount + nonResourceTileCount) {
            throw new Error("The number of board tile positions must equal the number of tiles.");
        }
        else if (resourceTileCount != resourceTileScoreCount) {
            throw new Error("The number of resource tiles and number of resource tile scores must be the same.");
        }

        for (let gameTilePosition of gameTilePositions) {
            if (expansionTilePositions.includes(gameTilePosition)) {
                throw new Error("Expansion tile positions cannot be part of the game tile positions.");
            }
        }

        this.tilePositions = gameTilePositions.concat(expansionTilePositions)
            .sort((a, b) => a.y - b.y || a.x - b.x);

        this.resourceTileCounts = resourceTileCounts;
        this.resourceTileScoreCounts = resourceTileScoreCounts;

        this.nonResourceTileCounts = nonResourceTileCounts;

        this.isFirstRowLeftJustified = isFirstRowLeftJustified;
    }

    public static fromClassicBoard(): TileMapConfig {
        const gameTilePositions: BoardTilePosition[] = [
            [2, 1], [3, 1], [4, 1],
            [1, 2], [2, 2], [3, 2], [4, 2],
            [1, 3], [2, 3], [3, 3], [4, 3], [5, 3],
            [1, 4], [2, 4], [3, 4], [4, 4],
            [2, 5], [3, 5], [4, 5],
        ].map(pos => new BoardTilePosition(pos[0], pos[1], true));

        const expansionTilePositions: BoardTilePosition[] = [
            [1, 0], [2, 0], [3, 0], [4, 0],
            [1, 1], [5, 1],
            [0, 2], [5, 2],
            [0, 3], [6, 3],
            [0, 4], [5, 4],
            [1, 5], [5, 5],
            [1, 6], [2, 6], [3, 6], [4, 6],
        ].map(pos => new BoardTilePosition(pos[0], pos[1], false));

        const resourceTileCounts = new ResourceTileCounts({
            [ResourceTileType.Brick] : 3,
            [ResourceTileType.Lumber] : 4,
            [ResourceTileType.Ore] : 3,
            [ResourceTileType.Grain] : 4,
            [ResourceTileType.Wool] : 4,
        });

        const resourceTileScoreCounts = new ResourceTileScoreCounts({
            2: 1,
            3: 2,
            4: 2,
            5: 2,
            6: 2,
            8: 2,
            9: 2,
            10: 2,
            11: 2,
            12: 1,
        });

        const nonResourceTileCounts = new NonResourceTileCounts({
            [NonResourceTileType.Desert] : 1,
            [NonResourceTileType.Empty] : 0,
        });

        return new TileMapConfig({
            gameTilePositions,
            expansionTilePositions,
            resourceTileCounts,
            resourceTileScoreCounts,
            nonResourceTileCounts,
            isFirstRowLeftJustified: false,
        });
    }
}