import { TilePosition } from "../Tile/TilePosition";
import { BoardNonResourceTileType, BoardResourceTileType } from "../Tile/TileType";
import { NonScoredTileTypeCensus } from "./NonScoredTileTypeCensus";
import { ScoredTileTypeCensus } from "./ScoredTileTypeCensus";
import { TileRowIndentationScheme } from "./TileRowIndentationScheme";
import { TileScoreCensus } from "./TileScoreCensus";

interface TileMapConfigParams {
    boardTilePositions: TilePosition[];
    expansionTilePositions: TilePosition[];
    
    scoredTileTypeCounts: ScoredTileTypeCensus;
    tileScoreCounts: TileScoreCensus;

    nonScoredTileTypeCounts: NonScoredTileTypeCensus;

    tileRowIndentationScheme: TileRowIndentationScheme;
}

export class TileMapConfig {
    readonly tilePositions: TilePosition[];

    readonly scoredTileTypeCounts: ScoredTileTypeCensus;
    readonly tileScoreCounts: TileScoreCensus;

    readonly nonScoredTileTypeCounts: NonScoredTileTypeCensus;

    readonly tileRowIndentationScheme: TileRowIndentationScheme;

    constructor({boardTilePositions, expansionTilePositions, scoredTileTypeCounts, tileScoreCounts, nonScoredTileTypeCounts, tileRowIndentationScheme}: TileMapConfigParams) {
        const boardTilePositionCount = boardTilePositions.flat().length;

        const scoredTileCount = scoredTileTypeCounts.totalCount();
        const tileScoreCount = tileScoreCounts.totalCount();

        const nonScoredTileCount = nonScoredTileTypeCounts.totalCount();

        // check that the number of board tile positions matches the number of tile types
        if (boardTilePositionCount != scoredTileCount + nonScoredTileCount) {
            throw new Error("The number of board tile positions must equal the number of tiles.");
        }

        // check that the number of resource tile scores matches the number of resource tile types
        else if (scoredTileCount != tileScoreCount) {
            throw new Error("The number of scored tiles and number of tile scores must be the same.");
        }

        // check that the expansion tile positions and game tile positions are disjoint
        for (let boardTilePosition of boardTilePositions) {
            if (expansionTilePositions.includes(boardTilePosition)) {
                throw new Error("Expansion tile positions cannot be part of the board tile positions.");
            }
        }

        // combine game tile postions and expansion tile positions, sorting by row and then by column
        this.tilePositions = boardTilePositions.concat(expansionTilePositions)
            .sort((pos1, pos2) => pos1.x - pos2.x || pos1.y - pos2.y);

        console.log(this.tilePositions);

        this.scoredTileTypeCounts = scoredTileTypeCounts;
        this.tileScoreCounts = tileScoreCounts;

        this.nonScoredTileTypeCounts = nonScoredTileTypeCounts;

        this.tileRowIndentationScheme = tileRowIndentationScheme;
    }

    /**
     * constructs a TileMapConfig instance based on the classic Catan board
     * @returns a TileMapConfig based on the classic Catan board
     */
     public static fromClassicBoard(): TileMapConfig {
        const boardTilePositions: TilePosition[] = [
            [1, 2], [1, 3], [1, 4],
            [2, 1], [2, 2], [2, 3], [2, 4],
            [3, 1], [3, 2], [3, 3], [3, 4], [3, 5],
            [4, 1], [4, 2], [4, 3], [4, 4],
            [5, 2], [5, 3], [5, 4],
        ].map(([x, y]) => new TilePosition(x, y, true));

        const expansionTilePositions: TilePosition[] = [
            [0, 1], [0, 2], [0, 3], [0, 4],
            [1, 1], [1, 5],
            [2, 0], [2, 5],
            [3, 0], [3, 6],
            [4, 0], [4, 5],
            [5, 1], [5, 5],
            [6, 1], [6, 2], [6, 3], [6, 4],
        ].map(([x, y]) => new TilePosition(x, y, false));

        const scoredTileTypeCounts = new ScoredTileTypeCensus({
            [BoardResourceTileType.Brick] : 3,
            [BoardResourceTileType.Lumber] : 4,
            [BoardResourceTileType.Ore] : 3,
            [BoardResourceTileType.Grain] : 4,
            [BoardResourceTileType.Wool] : 4,
            [BoardNonResourceTileType.Desert] : 0,
        });

        const tileScoreCounts = new TileScoreCensus({
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

        const nonScoredTileTypeCounts = new NonScoredTileTypeCensus({
            [BoardResourceTileType.Brick] : 0,
            [BoardResourceTileType.Lumber] : 0,
            [BoardResourceTileType.Ore] : 0,
            [BoardResourceTileType.Grain] : 0,
            [BoardResourceTileType.Wool] : 0,
            [BoardNonResourceTileType.Desert] : 1
        });

        return new TileMapConfig({
            boardTilePositions,
            expansionTilePositions,
            scoredTileTypeCounts,
            tileScoreCounts,
            nonScoredTileTypeCounts,
            tileRowIndentationScheme: TileRowIndentationScheme.Odd,
        });
    }

    /**
     * constructs a TileMapConfig instance based on the smallest possible board
     * @returns a TileMapConfig based on the smallest possible board
     */
     public static fromSmallestBoard(): TileMapConfig {
        const boardTilePositions: TilePosition[] = [];

        const expansionTilePositions: TilePosition[] = [
            new TilePosition(0, 0, false)
        ];

        const scoredTileTypeCounts = new ScoredTileTypeCensus({
            [BoardResourceTileType.Brick] : 0,
            [BoardResourceTileType.Lumber] : 0,
            [BoardResourceTileType.Ore] : 0,
            [BoardResourceTileType.Grain] : 0,
            [BoardResourceTileType.Wool] : 0,
            [BoardNonResourceTileType.Desert] : 0,
        });

        const tileScoreCounts = new TileScoreCensus({});

        const nonScoredTileTypeCounts = new NonScoredTileTypeCensus({
            [BoardResourceTileType.Brick] : 0,
            [BoardResourceTileType.Lumber] : 0,
            [BoardResourceTileType.Ore] : 0,
            [BoardResourceTileType.Grain] : 0,
            [BoardResourceTileType.Wool] : 0,
            [BoardNonResourceTileType.Desert] : 0
        });

        return new TileMapConfig({
            boardTilePositions,
            expansionTilePositions,
            scoredTileTypeCounts,
            tileScoreCounts,
            nonScoredTileTypeCounts,
            tileRowIndentationScheme: TileRowIndentationScheme.Even,
        });
    }
}