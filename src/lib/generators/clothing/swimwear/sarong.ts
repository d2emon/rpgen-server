import { ClothingGenerator } from '../types';

export class Sarong extends ClothingGenerator {
    generateDescription(): string {
        return 'If sarong is chosen, it\'s [sarong style].';
    }
}
