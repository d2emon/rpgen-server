import {Clothing, ClothingGenerator} from '../types';
import { choice } from '../utils';
import { Nightgown } from './nightgown';
import { Pajamas } from './pajamas';
import { ShirtAndShorts } from './shirtAndShorts';
import underwear from '../underwear';

class Underwear extends ClothingGenerator {
    constructor() {
        super('');
    }
    generate(): Clothing {
        return underwear();
    }
}
const items: ClothingGenerator[] = [
    new Nightgown('nightgown'),
    new Pajamas('pajamas'),
    new ShirtAndShorts('shirt and shorts'),
    new Pajamas('feetie/onsie'),
    new Underwear(),
    undefined,
];

export default (): Clothing => {
    const generator: ClothingGenerator = choice(items);
    return generator && generator.generate();
}
