import { PlayerColor } from "./PlayerColor";
import type { RoadOrientation } from "./RoadOrientation";

export class RoadData {
    orientation: RoadOrientation;
    isPlaced: boolean;
    isPlaceable: boolean;
    playerColor: PlayerColor;
    
    constructor(orientation: RoadOrientation, isPlaced: boolean, isPlaceable: boolean, playerColor?: PlayerColor) {
        this.orientation = orientation;
        this.isPlaced = isPlaced;
        this.isPlaceable = isPlaceable;

        if (playerColor !== undefined) {
            this.playerColor = playerColor;
        }
        else {
            this.playerColor = PlayerColor.None;
        }
    }

    toString() {
        return `${this.orientation} ${this.isPlaced} ${this.isPlaceable} ${this.playerColor}`;
    }
}