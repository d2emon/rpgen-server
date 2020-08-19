import { ClothingGenerator } from '../types';

export class Bikini extends ClothingGenerator {
    generateDescription(): string {
        return 'If bikini is chosen, it\'s a [fit] bikini, that is a [bikini style] with a [bikini neckline] neckline and is [bikini straps].  The bikini bottoms are [bottom style].';
    }
}
