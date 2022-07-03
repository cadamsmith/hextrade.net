import type { ResourceType } from "./ResourceType";

export class TileData {
    resourceType: ResourceType;
    score: number;
    
    constructor(resourceType: ResourceType, score: number) {
        this.resourceType = resourceType;
        this.score = score;
    }
}