import { ClothingGenerator } from '../types';

export class ShirtAndShorts extends ClothingGenerator {
    generateDescription(): string {
        return 'If shirt and shorts are chosen, then the shirt or shorts are [s+s style].';
    }
}
