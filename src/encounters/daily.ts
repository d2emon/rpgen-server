import { d6 } from '../lib/dice';

export interface DailyEncounters {
    day: number;
    night: number;
}

export interface EncounterRollOptions {
    day?: number;
    night?: number;
    savage?: boolean;
}

export const daily = (options: EncounterRollOptions = {}): DailyEncounters => {
    const {
        day = 1,
        night = 1,
        savage = false,
    } = options;

    const encounters: DailyEncounters = {
        day,
        night,
    };
    const roll: number = d6.next().value;
    if (roll === d6.next().value) {
        if (roll % 2) {
            encounters.night += 1;
        } else {
            encounters.day += 1;
        }
        if (savage) {
            return daily({
                ...options,
                day: encounters.day,
                night: encounters.night,
            });
        }
    }
    return encounters;
}
