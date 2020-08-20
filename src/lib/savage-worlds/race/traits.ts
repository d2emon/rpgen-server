import { Character } from '../character';

export interface RacialTrait {
    traitId: string;
    name: string;
    description?: string;
    onApply: (character: Character) => void;
}

export type OnApply = (character: Character) => void;

export const onApply: { [id: string]: OnApply } = {
    AGILE: (character: Character) => {
        character.agilityId += 1;
    },
    ALL_THUMBS: (character: Character) => {
        character.allThumbs = true;
    },
    AQUATIC: (character: Character) => {
        character.surviveInDepth = true;
        character.pace.swimming = character.swimming;
        character.needSpend.push({
            environment: 'WATER',
            period: 48,
            spend: 8,
        });
    },
    BLOODTHIRSTY: (character: Character) => {
        character.bloodthirsty = true;
    },
    BONUS_EDGE: (character: Character) => {
        character.initialEdges += 1;
    },
    CARAPACE: (character: Character) => {
        character.armor += 2;
    },
    CLAWS: (character: Character) => {
        character.naturalWeapons.push({
            strengthBonus: 2,
        });
        character.climbBonus += 2;
    },
    FLIGHT: (character: Character) => {
        character.wingSpan = 2;
        character.pace.flying = 10 - character.weightPenalty;
        character.pace.flyDiveHorizontal = character.pace.flying * 2;
        character.pace.flyDiveVertical = 1;
        character.pace.climb = 5;
    },
    HERITAGE: (character: Character, options = {
        human: false
    }) => (options.human ? onApply.BONUS_EDGE : onApply.AGILE),
    INFRAVISION: (character: Character) => {
        character.infravision = true
    },
    LEAPING: (character: Character) => {
        character.pace.leap *= 4;
    },
    LOW_LIGHT_VISION: (character: Character) => {
        character.ignoreDark = [
            'Dim',
            'Dark',
        ];
    },
    LUCK: (character: Character) => {
        character.initialBennies += 1;
    },
    NATURAL_SWIMMER: (character: Character) => {
        character.swimming += 1;
        character.pace.swimming = character.swimming;
    },
    NATURAL_WEAPON: (character: Character) => {
        character.naturalWeapons.push({
            strengthBonus: 1,
        });
    },
    NO_HARD_ROUTE: (character: Character) => {
        character.outsider = true;
    },
    OUTSIDER: (character: Character) => {
        character.charisma -= 2;
    },
    POUNCE: (character: Character) => {
        character.pounceBonus = 4;
    },
    SAURIAN_SENSES: (character: Character) => {
        character.notice += 2;
        character.isActive = true;
    },
    SLOW: (character: Character) => {
        character.pace.normal = 5;
    },
    SMALL: (character: Character) => {
        character.height = 4;
        character.toughness -= 1;
    },
    SPIRITED: (character: Character) => {
        character.spiritId += 1;
    },
    STRONG: (character: Character) => {
        character.strengthId += 1;
    },
    TOUGH: (character: Character) => {
        character.vigorId += 1;
    },
};
