export interface Step {
    id: string;
    title: string;
    enigma: string;
    solution: string;
    latitude: number;
    longitude: number;
    isPausePoint: boolean;
    // AI Enhanced fields
    locationClue?: string;
    riddleType?: 'text' | 'photo' | 'info';
    hint?: string;
}
