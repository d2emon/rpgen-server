import { ClothingGenerator } from '../types';

export class DressingGown extends ClothingGenerator {
    generateDescription(): string {
        return 'If dressing gown is chosen, it\'s [length] length with [dressing gown sleeve length] length sleeves that\'s [dressing gown style] and has [dressing gown collar] collar.';
    }
}
