import { ClothingGenerator } from '../types';

export class SwimmingCostume extends ClothingGenerator {
    generateDescription(): string {
        return 'If swimming costume is chosen, its [fit] with a [swimming costume neckline] neckline and is/has [swimming costume straps].';
    }
}
