import { d6 } from '../lib/dice';
import BaseEncounter, {
    Encounter,
} from './encounter';
import getDistance from './distance';

class DayEncounter extends BaseEncounter implements Encounter {
    constructor(encounter: Encounter = {}) {
        super(encounter);
        this.distance = encounter.distance || getDistance(d6.next().value);
    }
}

export default DayEncounter;
