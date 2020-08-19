import { ClothingGenerator } from '../types';

export class Bra extends ClothingGenerator {
    generateDescription(): string {
        return 'If a bra is chosen, it is a [bra type] bra.';
    }
}
