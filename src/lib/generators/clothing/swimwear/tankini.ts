import { ClothingGenerator } from '../types';

export class Tankini extends ClothingGenerator {
    generateDescription(): string {
        return 'If tankini is chosen, it has a [tankini neckline] neckline, and has [bottom style] bottoms.';
    }
}
