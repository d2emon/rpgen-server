import { Color, generateColor } from './colors';
import { Pattern, generatePattern } from './patterns';

export interface Clothing {
    clothingType: string;
    item: string;
    color: Color;
    pattern?: Pattern;

    name: string;
    description?: string;
}

export class ClothingGenerator {
    clothingType: string;

    constructor(clothingType: string) {
        this.clothingType = clothingType;
    }

    generateDescription(): string {
        return '';
    }

    generate(): Clothing {
        const description = this.generateDescription();
        return {
            clothingType: this.clothingType,
            color: generateColor(),
            pattern: generatePattern(),
            item: description,
            name: this.clothingType,
            description,
        };
    }
}
