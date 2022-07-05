
const diceRollResults = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export function getAllDiceRollResults(): number[] {
    return diceRollResults;
}

export function getAllTileMarkerNumbers(): number[] {
    return diceRollResults.filter(r => r != 7);
}