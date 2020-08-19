import { ClothingGenerator } from '../types';

export class Chemise extends ClothingGenerator {
    generateDescription(): string {
        return 'If chemise is chosen, it\'s [length] length with [chemise neckline] neckline and [chemise collar] collar.';
    }
}
