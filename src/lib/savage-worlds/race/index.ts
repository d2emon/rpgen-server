import { RacialTrait } from './traits';
import { Character } from '../character';

export interface Race {
    raceId: string;
    name: string;
    description?: string;
    traits: RacialTrait[];
}

export const applyRace = (character: Character, race: Race) => {
    character.raceId = race.raceId;
    race.traits.forEach((trait: RacialTrait) => trait.onApply(character));
}