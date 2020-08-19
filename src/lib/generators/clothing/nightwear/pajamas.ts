import { ClothingGenerator } from '../types';

export class Pajamas extends ClothingGenerator {
    generateDescription(): string {
        return 'If pajamas is chosen, it\'s [pajama style], and has a [pajama neckline] neckline.';
    }
}
