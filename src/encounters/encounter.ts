import roll, {
    d6,
    d20,
} from '../lib/dice';
import getDistance, {
    Distance,
} from './distance';
import getReaction, {
    Reaction
} from './reaction';

export interface Encounter {
    distance?: Distance;
    encounterType?: string;
    reaction?: Reaction
    size?: number;
    surprises?: boolean;
    surprised?: boolean;
    time?: number;
}

const encounterTypes = [
    'Столкновение',
    'Путевая встреча/Возможное столкновение',
    'Привал/Возможное столкновение',
    'Подсказка',
    'Трата ресурсов',
    'Задержка в пути',
]

const random = (maxNumber: number) => Math.floor(Math.random() * maxNumber);

export const generateEncounterTime = (maxTime: number): number => random(maxTime);
export const generateEncounterType = (): string => encounterTypes[random(encounterTypes.length)];
export const generateSurprise = (): boolean => (d6.next().value <= 2);

export const toRunCheck = (
    groupSize: number,
    encounter: Encounter,
    modifier: number = 0,
): boolean => {
    const baseToRun = (size: number): number => {
        if (size <= 1) {
            return 15;
        } else if (size <= 4) {
            return 17;
        } else if (size <= 12) {
            return 19;
        } else if (size < 24) {
            return 21;
        } else {
            return 23;
        }
    };

    if (encounter.surprises) {
        return false;
    }
    if (encounter.surprised && encounter.distance && (encounter.distance.distance > 10)) {
        return true;
    }

    let result = baseToRun(groupSize) + modifier;
    if (encounter.size > groupSize) {
        result -= 1;
    } else if (encounter.size < groupSize) {
        result += 1;
    }

    return (d20.next().value >= result);
}

class BaseEncounter implements Encounter {
    distance?: Distance;

    encounterType?: string;

    reaction?: Reaction;

    size?: number;

    surprised?: boolean;

    surprises?: boolean;

    time?: number;

    constructor(encounter: Encounter = {}) {
        this.time = encounter.time || generateEncounterTime(12);
        this.encounterType = encounter.encounterType || generateEncounterType();
        this.size = encounter.size || 1;
        this.surprised = encounter.surprised || generateSurprise();
        this.surprises = encounter.surprises || generateSurprise();
        this.distance = encounter.distance || getDistance(0);
        this.reaction = encounter.reaction || getReaction(roll(2, 6));
    }
}

export default BaseEncounter;
