import { ClothingGenerator } from '../types';

export class Nightgown extends ClothingGenerator {
    generateDescription(): string {
        return 'If nightgown is chosen, it\'s a [nightgown style] nightgown with a [nightgown neckline] neckline, and [sleeve length] sleeves.';
    }
}
