import { d4 } from '../lib/dice';
import BaseEncounter, {
    Encounter,
} from './encounter';
import getDistance from './distance';

class NightEncounter extends BaseEncounter implements Encounter {
    constructor(encounter: Encounter = {}) {
        super(encounter);
        this.distance = encounter.distance || getDistance(d4.next().value);
    }
}

export default NightEncounter;
